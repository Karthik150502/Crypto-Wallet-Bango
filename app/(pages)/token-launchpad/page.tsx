import React from 'react'
import TokenLanchpadForm from '@/app/components/tokenLaunchpad/form'
import Image from 'next/image'
export default function page() {
  return (
    <div className='p-4 flex items-center relative flex-col justify-center min-h-screen bg-transparent'>
      <Image src="https://wallpapercave.com/w/wp9116463.jpg" alt="space background" height={720} width={1080} className="-z-10 absolute w-screen h-screen"></Image>
      <p className='text-7xl font-extrabold'>Solana Token Launchpad</p>
      <TokenLanchpadForm />
    </div>
  )
}
