import React from 'react'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
export default function WalletAdapterBrewed() {
    return (
        <div>
            <WalletModalProvider>
                <div className='flex items-center justify-center gap-x-2 p-4 flex-wrap'>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                </div>
            </WalletModalProvider>
        </div >
    )
}
