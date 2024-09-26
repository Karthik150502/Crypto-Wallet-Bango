'use client'
import AppWalletProvider from '@/app/components/appWalletProvider/appWalletProvider'
import WalletAdapterBrewed from '@/components/ui/walletAdapter'
import React from 'react'
import AirdropSolana from '@/components/SolanaAirdrop/SolanaAirDrop'
export default function page() {
    return (
        <div className='p-4 flex items-center relative flex-col justify-center min-h-screen bg-cover bg-hero'>
            <AppWalletProvider>
                <p className='text-7xl text-center font-extrabold md:text-6xl sm:text-5xl xs:text-4xl'>Send Solana</p>
                <AirdropSolana />
                <WalletAdapterBrewed />
            </AppWalletProvider>
        </div >
    )
}
