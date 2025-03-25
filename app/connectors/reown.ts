import {createAppKit} from '@reown/appkit/react'

import {arbitrum, bsc, mainnet} from '@reown/appkit/networks'
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
export const networks = [mainnet, arbitrum, bsc] as [AppKitNetwork, ...AppKitNetwork[]]

// 4. Create Wagmi Adapter
export const reownWagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
})

// 5. Create modal
createAppKit({
    adapters: [reownWagmiAdapter],
    enableEIP6963: true,
    featuredWalletIds: ['971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709'],
    networks,
    projectId,
    metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

