'use client'
import React from 'react'
import TokenLanchpadForm from '@/app/components/tokenLaunchpad/form'
import Image from 'next/image'
import SolanaTokenLaunchpad from '@/components/tokenLauncpad/tokenLaunchpad'
import "./styles.css"
import AppWalletProvider from '@/app/components/appWalletProvider/appWalletProvider'
import SendSolana from '@/components/sendSolana/sendSolana'
import WalletAdapterBrewed from '@/components/ui/walletAdapter'
export default function page() {
  return (
    <div className='p-4 flex items-center relative flex-col justify-center min-h-screen bg-transparent bg-cover bg-hero'>
      <AppWalletProvider>

        {/* <SolanaTokenLaunchpad /> */}
        <SendSolana enterPrivateKey />
        {/* <SendSolana /> */}
        {/* <TokenLanchpadForm /> */}
        {/* <WalletAdapterBrewed /> */}
      </AppWalletProvider>
    </div >
  )
}
