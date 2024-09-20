'use client'
import { Input } from '@/components/ui/input'
import Button from '../ui/button'
import React, { useState } from 'react';
import "./styles.css"
import { getAccount } from '@/app/packages/solanToken';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import SolanaAccountDisplay from '../ui/solanaAccountDisplay';
import { SolanaWallet } from '@/app/types/solana';
import { useToast } from '@/hooks/use-toast';


type FormInput = {
    walletaddr: string
}

export default function TokenLanchpadForm() {



    const [walletInfo, setWalletInfo] = React.useState<SolanaWallet>({} as SolanaWallet)
    const toast = useToast();
    const [formData, setFormData] = useState<FormInput>({} as FormInput);

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            let res = await getAccount(formData.walletaddr);
            setWalletInfo((prev) => ({
                publicKey: formData.walletaddr,
                balance: res?.lamports ? (res?.lamports / LAMPORTS_PER_SOL) : 0
            }))
            console.log(res)
            console.log(walletInfo)
            toast.toast({
                title: "Fetched wallet.",
                variant: "default"
            })
        } catch (e) {
            console.log(e)
            toast.toast({
                title: "Cannot fetch the wallet.",
                description: "Cannot fetch the wallet, kindly check the wallet address.",
                variant: "destructive"
            })
        }
    }







    return (
        <form onSubmit={handleSubmit} className='glass-bg flex flex-col items-center justify-center p-4 rounded-lg gap-y-4 min-w-fit'>
            <label htmlFor="" className='flex flex-col items-start gap-y-2 justify-start'>
                <p className='text-xs ml-3'>Wallet Address</p>
                <Input type='text' name='walletaddr' className='placeholder:text-slate-500 rounded-full p-2 w-full bg-slate-950 text-xs' placeholder='Enter the Wallet Address' onChange={(event) => {
                    handleChange(event.target.name, event.target.value)
                }} />
            </label>
            <Button type='submit' className='rounded-full'>Find Wallet</Button>
            {
                walletInfo.publicKey && <SolanaAccountDisplay {...walletInfo} />
            }
        </form>
    )
}
