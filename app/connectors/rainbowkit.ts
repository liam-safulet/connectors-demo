import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {projectId} from "../constants";
import {mainnet} from 'wagmi/chains';
import {binanceWallet} from "@rainbow-me/rainbowkit/wallets";

export const rainbowKitConfig = getDefaultConfig({
    appName: 'RainbowKit demo',
    projectId,
    chains: [
        mainnet,
    ],
    wallets: [{groupName: 'Recommended', wallets: [binanceWallet]}]
});

