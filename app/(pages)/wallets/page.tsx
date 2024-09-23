import React from 'react'
import LandingHero from '@/app/components/ui/landing'
import Footer from '@/app/components/ui/footer'

import logo from './../../../assets/bango-logo-zip-file/svg/logo-no-background.svg';
import Image from 'next/image'



export default function page() {





    return (
        <div className='min-h-screen relative p-8 flex flex-col items-start justify-start'>


            <div className="flex flex-col items-center justify-start gap-y-4">
                <Image src={logo} alt='Bango Logo' height={300} width={300}></Image>
                <p className='text-sm'>An interesting fact about cryptocurrency is that the total supply of Bitcoin is capped at 21 million coins. This hard limit, embedded in Bitcoin's code, means that once 21 million bitcoins are mined (expected around 2140), no more can be created. This scarcity is designed to mimic precious metals like gold, driving up Bitcoin’s value over time as demand increases and supply remains limited.</p>
            </div>
            <LandingHero />
            <Footer />

        </div>
    )
}
