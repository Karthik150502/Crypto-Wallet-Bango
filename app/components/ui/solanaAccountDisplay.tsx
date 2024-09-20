'use client'
import React, { useState } from 'react'

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate
} from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { COLORS_FOR_WALLET } from '@/lib/config';
import { type SolanaWallet } from '@/app/types/solana'
import Button from './button';
import { Input } from '@/components/ui/input';
import { airDropSol } from '@/app/packages/solanToken';
import { useToast } from '@/hooks/use-toast';

export default function SolanaAccountDisplay({ publicKey, balance }: SolanaWallet) {


    // Styling props
    const COLORS = COLORS_FOR_WALLET[Math.floor(Math.random() * COLORS_FOR_WALLET.length)]
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`
    const toast = useToast();


    const [solanaToAirdrop, setSolanAirdropAmount] = useState<number>(0);

    const airdrop = async () => {
        try {
            let res = await airDropSol(publicKey, solanaToAirdrop)
            console.log(res)
            toast.toast({
                title: `${solanaToAirdrop} SOL Airdrop successful`,
                description: "",
                variant: "default"
            })
        } catch (e) {
            toast.toast({
                title: "Failed to airdrop solana",
                description: "",
                variant: "destructive"
            })
        }


    }

    return (
        <motion.div
            className='min-w-[320px] max-w-[450px] w-[340px] flex flex-col items-start justify-center p-4 gap-y-1 rounded-xl'
            style={{
                backgroundImage
            }}
        >
            <p className='text-xs'><span className='font-extrabold'>Wallet Addres</span><br /><span className='text-[10px]'>{publicKey}</span></p>
            <p className='text-xs'><span className='font-extrabold'>Balance</span><br /><span className='text-[10px]'>SOL {balance}</span></p>
            <div className='w-full flex items-center justify-evenly gap-x-1'>

                <Dialog>
                    <DialogTrigger ><Button className='mx-auto'>Create Mint</Button></DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-green-500 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Heading</DialogTitle>
                            <DialogDescription>

                                <DialogClose>
                                    Close Modal
                                </DialogClose>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger> <Button className='mx-auto'>Airdrop some Solana</Button></DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-yellow-500 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Create new Wallet</DialogTitle>
                            <DialogDescription className='flex flex-col items-center justify-center gap-y-2'>
                                <Input placeholder="Amount" className='p-2 rounded-full placeholder:text-slate-500 text-white' onChange={(event) => {
                                    setSolanAirdropAmount(Number(event.target.value))
                                }}></Input>
                                <DialogClose onClick={() => airdrop()} >
                                    <Button className='rounded-full mx-auto'>Airdrop Solana</Button>
                                </DialogClose>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </motion.div >
    )
}
