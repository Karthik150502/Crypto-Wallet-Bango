'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { getMnemonics } from '@/lib/actions'
import { useState } from 'react'
import SecretPhrase from './secretPhrase'
import { useMnemonicStore } from '@/app/zustand/store'
import SolanaWallet from './solanaWallet'
import { useRouter } from 'next/navigation'
import ImportWallet from './importWallet'
import RemoveWallet from './removeWallet'

export default function LandingHero() {

    const [walletCreated, SetWalletCreated] = useState<boolean>(false);
    const [seeds, setSeed] = useState<string[]>([])
    const { mnemonic, editMnemonic } = useMnemonicStore();
    const router = useRouter();






    const generateMneMonics = () => {
        let seeds = getMnemonics();
        console.log(seeds)
        editMnemonic(seeds);
        setSeed((prev) => seeds.split(" "));
        SetWalletCreated(true)
    }





    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="starter flex flex-col gap-y-2 items-center gap-x-2 my-4 w-full justify-center">

                <ImportWallet />
                <Button className='rounded-full bg-gray-700 hover:bg-gray-600' onClick={() => {
                    router.push("/token-launchpad")
                }}>Open Token Launcpad</Button>
                {
                    mnemonic ?
                        <RemoveWallet /> : <div className='mt-4 flex flex-col gap-y-2 items-center justify-between px-4 gap-x-2'>
                            <p className='mx-2 text-sm text-center'> Or Start by creating a Wallet</p>
                            <Button className='rounded-full bg-gray-700 hover:bg-gray-600' onClick={() => generateMneMonics()}>Generate Wallet</Button>
                        </div>
                }
            </div>
            {
                mnemonic && <>
                    <SecretPhrase secretPhrase={seeds} />
                    <SolanaWallet />
                </>
            }
        </div >
    )
}
