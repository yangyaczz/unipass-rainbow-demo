import { Outlet } from "umi";
import styles from "./index.less";
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";


import {
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";


import { configureChains, createClient, WagmiConfig } from "wagmi";


import {
  goerli,
  polygonMumbai,
  polygon
} from "wagmi/chains";


import { publicProvider } from "wagmi/providers/public";


import { unipassWallet } from "@unipasswallet/rainbowkit-plugin";

export default function Layout() {
  const { chains, provider } = configureChains(
    [goerli,polygon],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ 
        metaMaskWallet({ chains, shimDisconnect: true }),
        unipassWallet({
          chains,
          connect: {
            chainId: goerli.id,
            returnEmail: false,
            appSettings: {
              appName: "wagmi demo",
            },
          },
        }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className={styles.navs}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Outlet />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
