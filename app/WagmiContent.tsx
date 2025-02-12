import {useConnect} from 'wagmi'
import {Button, Modal, Image} from "antd";
import {useState} from "react";

const BINANCE_WALLET_ICON =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMEIwRTExIi8+CjxwYXRoIGQ9Ik01IDE1TDcuMjU4MDYgMTIuNzQxOUw5LjUxNjEzIDE1TDcuMjU4MDYgMTcuMjU4MUw1IDE1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNOC44NzA5NyAxMS4xMjlMMTUgNUwyMS4xMjkgMTEuMTI5TDE4Ljg3MSAxMy4zODcxTDE1IDkuNTE2MTNMMTEuMTI5IDEzLjM4NzFMOC44NzA5NyAxMS4xMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMi43NDE5IDE1TDE1IDEyLjc0MTlMMTcuMjU4MSAxNUwxNSAxNy4yNTgxTDEyLjc0MTkgMTVaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0xMS4xMjkgMTYuNjEyOUw4Ljg3MDk3IDE4Ljg3MUwxNSAyNUwyMS4xMjkgMTguODcxTDE4Ljg3MSAxNi42MTI5TDE1IDIwLjQ4MzlMMTEuMTI5IDE2LjYxMjlaIiBmaWxsPSIjRjBCOTBCIi8+CjxwYXRoIGQ9Ik0yMC40ODM5IDE1TDIyLjc0MTkgMTIuNzQxOUwyNSAxNUwyMi43NDE5IDE3LjI1ODFMMjAuNDgzOSAxNVoiIGZpbGw9IiNGMEI5MEIiLz4KPC9zdmc+Cg=='

export function WagmiContent() {
    const [isOepn, setIsOpen] = useState(false)
    const {connectors} = useConnect({})
    const connector = connectors.find(c => c.name === 'WalletConnect')
    if (!connector) {
        return null
    }
    const wcConnectorIndex = connectors.findIndex(c => c.name === 'WalletConnect')
    const restConnectors = connectors.filter((c, index) => index !== wcConnectorIndex)
    return <>
        <Button onClick={() => setIsOpen(true)}>Wagmi Connect</Button>
        <Modal title="Basic Modal" open={isOepn} onOk={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}>
            <div style={{display: 'flex', marginBottom: 10, alignItems: 'center', gap: 5}} onClick={() => {
                connector.connect()
                setTimeout(() => {
                    setIsOpen(false)
                }, 1000)
            }}>
                <Image
                    alt='1'
                    width={30}
                    src={BINANCE_WALLET_ICON}
                />
                <div>
                    BINANCE WALLET
                </div>
            </div>
            {restConnectors.map(c => {
                    return <div onClick={() => {
                        c.connect()
                    }} style={{display: 'flex', marginBottom: 10, alignItems: 'center', gap: 5}} key={c.name}>
                        <Image
                            alt='1'
                            width={30}
                            src={c.icon}
                        />
                        {c.name}
                    </div>
                }
            )
            }
        </Modal>
    </>
}