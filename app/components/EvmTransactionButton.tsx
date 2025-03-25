'use client'
import { useState } from 'react'
import { useAccount, useConnect, useWalletClient, usePublicClient } from 'wagmi'

interface EvmTransactionButtonProps {
  chainId: number // 这是十进制接口，方便使用
}

export function EvmTransactionButton({ chainId }: EvmTransactionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const handleTransaction = async () => {
    setError(null)
    setIsLoading(true)
    
    try {
      // 如果未连接钱包，先连接
      if (!isConnected || !address) {
        // 获取可用的 connector (通常是 injected - MetaMask)
        const injectedConnector = connectors.find(c => c.id === 'injected')
        if (!injectedConnector) {
          throw new Error('没有找到可用的钱包连接器')
        }
        
        try {
          await connect({ connector: injectedConnector })
        } catch (connectError) {
          throw new Error(`连接钱包失败: ${(connectError as Error).message}`)
        }
      }
      
      // 发送交易
      if (!walletClient) {
        throw new Error('钱包客户端未初始化')
      }


      const toHexString = (num: number) => `0x${num.toString(16)}`

      const p = {
        to: '0x171e1b6a86dcaca65fd2da34e7de36a584da6965',
        value: BigInt(0),
        chainId: toHexString(chainId)
      }
      console.log('tx:',p)
      // @ts-expect-error
      const hash = await walletClient.sendTransaction(p)
      
      setTxHash(hash)
      console.log('交易哈希:', hash)
      
      // 等待交易确认
      await publicClient?.waitForTransactionReceipt({ hash })
      alert(`交易成功! 哈希: ${hash}`)
      
    } catch (err) {
      console.error('交易错误:', err)
      setError((err as Error).message)
      alert(`交易失败: ${(err as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={handleTransaction}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading 
          ? '处理中...' 
          : isConnected && address
            ? `发起 EVM 交易 (链ID: ${chainId})` 
            : '连接钱包并交易'
        }
      </button>
      
      {error && (
        <div className="text-red-500 text-sm">
          错误: {error}
        </div>
      )}
      
      {txHash && (
        <div className="text-green-500 text-sm">
          交易哈希: {txHash}
        </div>
      )}
    </div>
  )
} 