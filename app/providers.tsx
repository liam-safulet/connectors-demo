import {ReactNode} from "react";
import {WagmiProvider} from "wagmi";
import {reownWagmiAdapter} from "./connectors/reown";
import {rainbowKitConfig} from "./connectors/rainbowkit";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export const ReownProvider = ({children}: { children: ReactNode }) => {
    return <WagmiProvider config={reownWagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
}

export const RainbowProvider = ({children}: { children: ReactNode }) => {
    return <WagmiProvider config={rainbowKitConfig}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
}

