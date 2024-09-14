import React from 'react'
import Button from '@/app/components/ui/button'
import LandingHero from '@/app/components/ui/landing'
import Footer from '@/app/components/ui/footer'
export default function page() {




    const generateMnemonics = () => [

    ]

    return (
        <div className='min-h-screen relative p-8 flex flex-col items-start justify-start'>
            <div className="">
                <p className='text-sm'>An interesting fact about cryptocurrency is that the total supply of Bitcoin is capped at 21 million coins. This hard limit, embedded in Bitcoin's code, means that once 21 million bitcoins are mined (expected around 2140), no more can be created. This scarcity is designed to mimic precious metals like gold, driving up Bitcoin’s value over time as demand increases and supply remains limited.</p>
            </div>
            <LandingHero />
            <Footer />
        </div>
    )
}
