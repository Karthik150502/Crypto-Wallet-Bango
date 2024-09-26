'use client'
import Image from 'next/image';
import { Input } from '../ui/input';
import React, { useState } from 'react'
import logo from '@/assets/Solana/solanaLogoMark.svg'
import Button from '@/app/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import { airDropSol } from '@/app/packages/Solana/solanToken';
export default function AirdropSolana() {


    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const wallet = useWallet();
    const { toast } = useToast();

    const airdrop = async () => {
        if (!wallet.connected) {
            toast({
                title: `Kindly connect your wallet to airdrop.`,
                description: "",
                variant: "warning"
            })
            return
        }
        try {
            setIsLoading(true);
            let res = await airDropSol(wallet.publicKey?.toBase58()!, Number(amount))
            console.log(res)
            toast({
                title: `${amount} SOL Airdrop successful`,
                description: "",
                variant: "default"
            })
        } catch (e) {
            console.log(e)
            toast({
                title: "Failed to airdrop SOL",
                description: "",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }




    return (
        <section className='flex flex-col items-center justify-center'>
            <div className="flex items-center justify-center gap-x-3">
                <p className='text-6xl font-extrabold text-center'><i>SOLANA</i></p>
                <Image src={logo} height={60} width={60} alt="Solana Logo" />
            </div>
            <div className='flex lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center justify-center gap-x-2 gap-y-2'>
                <section className='min-w-[320px] w-360px max-w-[450px] h-[100px] p-8 rounded-none flex flex-col items-center justify-center gap-y-4 bg-gradient-to-tr from-[#9747FE] to-[#1FF0A7]'>
                    <label htmlFor="amount" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Amount</p>
                        <Input id="amount" onChange={(e) => { setAmount(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder="4 SOL" />
                    </label>
                </section>

            </div>
            <Button onClick={() => {
                airdrop()
            }} className='text-black bg-slate-100 hover:bg-slate-300 transition-colors my-2 p-4 rounded-full' disabled={isLoading}>Airdrop Solana</Button>
        </section>
    )
}
