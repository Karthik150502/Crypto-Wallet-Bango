import React from 'react'
import SolanaWalletDetailedView from '@/app/components/walletDetailedView/Solana/walletDetailed'

type Props = {
    params: {
        pubKey: string
    }
}

export default function page({ params: { pubKey } }: Props) {
    console.log("Wallet Address: ", pubKey)
    return (
        <div className='min-h-screen p-8 relative flex items-center justify-center'>
            <SolanaWalletDetailedView publicKey={pubKey} />
        </div>
    )
}
