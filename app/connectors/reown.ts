import {createAppKit} from '@reown/appkit/react'

import {arbitrum, mainnet} from '@reown/appkit/networks'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import type {AppKitNetwork} from '@reown/appkit/networks'
import {projectId} from "../constants";


// 2. Create a metadata object - optional
const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
export const networks = [mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]]

// 4. Create Wagmi Adapter
export const reownWagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
})

// 5. Create modal
createAppKit({
    adapters: [reownWagmiAdapter],
    enableEIP6963: true,
    // @ts-expect-error expected
    featuredWalletIds: [window.isBinance ? '': '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

