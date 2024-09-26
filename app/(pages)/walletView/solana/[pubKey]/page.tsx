import React from 'react'
import SolanaWalletDetailedView from '@/app/components/walletDetailedView/Solana/walletDetailed'
import SendSolanaModal from '@/app/components/sendSolanaModal/modal'
type Props = {
    params: {
        pubKey: string
    }
}

export default function page({ params: { pubKey } }: Props) {
    return (
        <div className='min-h-screen p-8 relative flex flex-col items-center justify-center'>
            <SolanaWalletDetailedView publicKey={pubKey} />
            <SendSolanaModal />
        </div>
    )
}
