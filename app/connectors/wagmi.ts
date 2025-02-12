import {http, createConfig} from 'wagmi'
import {base, mainnet} from 'wagmi/chains'
import {walletConnect} from 'wagmi/connectors'
import {projectId} from "../constants";

export const config = createConfig({
    chains: [mainnet, base],
    connectors: [
        // @ts-expect-error expected
        globalThis.isBinance ? undefined: walletConnect({projectId}),
        walletConnect({projectId}),
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
    },
})