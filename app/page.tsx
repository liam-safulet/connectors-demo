'use client'
import {RainbowProvider, ReownProvider} from "./providers";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import {config} from "./connectors/wagmi";
// import {WagmiProvider} from "wagmi";
// import {QueryClient} from "@tanstack/react-query";
// import {WagmiContent} from "./WagmiContent";

// const queryClient = new QueryClient();
export default function Home() {
    return (
      <div className='flex flex-col gap-5'>
        <ReownProvider>
          Reown:
             {/*@ts-expect-error expected*/}
          <appkit-button/>
        </ReownProvider>
        <RainbowProvider>
          RainbowKit:
          <ConnectButton/>
        </RainbowProvider>
        <DynamicContextProvider
            settings={{
              // Find your environment id at https://app.dynamic.xyz/dashboard/developer
              environmentId: "df8b3d4c-bb1e-4c62-aa9a-c1cb71f0e605",
              walletConnectors: [EthereumWalletConnectors],
              recommendedWallets: [
                { walletKey: "binance", label: "Popular" },
              ],
            }}
        >
          Dynamic xyz:
          <DynamicWidget />
        </DynamicContextProvider>
        {/*<WagmiProvider config={config}>*/}
        {/*  <QueryClientProvider client={queryClient}>*/}
        {/*    <div>*/}
        {/*      Wagmi:*/}
        {/*    </div>*/}
        {/*    <WagmiContent/>*/}
        {/*  </QueryClientProvider>*/}
        {/*</WagmiProvider>*/}
      </div>
  )

}
