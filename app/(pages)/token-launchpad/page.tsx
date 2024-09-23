'use client'
import React from 'react'
import TokenLanchpadForm from '@/app/components/tokenLaunchpad/form'
import Image from 'next/image'
import SolanaTokenLaunchpad from '@/components/tokenLauncpad/tokenLaunchpad'
import "./styles.css"
import AppWalletProvider from '@/app/components/appWalletProvider/appWalletProvider'
export default function page() {
  return (
    <div className='p-4 flex items-center relative flex-col justify-center min-h-screen bg-transparent'>
      <AppWalletProvider>
        <Image src="https://wallpapercave.com/w/wp9116463.jpg" alt="space background" height={720} width={1080} className="bg-move -z-10 absolute w-screen h-screen"></Image>
        <p className='text-7xl text-center font-extrabold md:text-6xl sm:text-5xl xs:text-4xl'>Token Launchpad</p>
        <SolanaTokenLaunchpad />
      </AppWalletProvider>
    </div >
  )
}
