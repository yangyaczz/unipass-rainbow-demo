import { useEffect, useState } from "react";
import { Button, Divider, Input, message } from "antd";
import {
  useAccount,
  useSigner,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../assets/UniPass.svg";

const { TextArea } = Input;

function App() {
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();


  const [nativeHash, setNativeHash] = useState("");


  const [sendNativeLoading, setSendNativeLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setNativeHash("");
      setSendNativeLoading(false);
    }
  }, [isConnected]);




  const mintNFT = async () => {
    if (signer && address) {
      try {
        setSendNativeLoading(true);
        const txParams = {
          to: "0x4BD87b902987e6379159C11Aa69CFcD3435cc573",  // nft goerli
          data: "0x1249c58b",  // mint sign
        };
        console.log(txParams);

        const txResp = await signer.sendTransaction(txParams);
        const res = await txResp.wait();
        console.log(res);
        setNativeHash(res.transactionHash);
      } catch (e: any) {
        message.error(e?.message || "error");
      } finally {
        setSendNativeLoading(false);
      }
    }
  };


  return (
    <div style={{ marginBottom: "50px", width: "750px" }}>
      <h1>RainbowKitUniPass----EZSWAP</h1>
      <ConnectButton />

      <Divider />
      <h3>Mint One NFT:</h3>
      <Button
        onClick={mintNFT}
        type="primary"
        disabled={!isConnected}
        loading={sendNativeLoading}
      >
        Mint NFT
      </Button>

      <h4>mint nft tx hash:</h4>
      <TextArea rows={1} value={nativeHash} />
      <Divider />
    </div>
  );
}

export default App;
