'use client'
import React, { useState } from 'react'
import { Keypair, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';




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
import { airDropSol } from '@/app/packages/Solana/solanToken';
import { useToast } from '@/hooks/use-toast';
import { createMintForToken } from '@/app/packages/Solana/solanaMintToken';
import bs58 from 'bs58'
export default function SolanaAccountDisplay({ publicKey, balance, executable }: SolanaWallet) {


    // Styling props
    const COLORS = COLORS_FOR_WALLET[Math.floor(Math.random() * COLORS_FOR_WALLET.length)]
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`
    const toast = useToast();


    const [solanaToAirdrop, setSolanAirdropAmount] = useState<number>(0);
    const [walletPrivateKey, setWalletPrivateKey] = useState<string>('');

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
            console.log(e)
            toast.toast({
                title: "Failed to airdrop SOL",
                description: "",
                variant: "destructive"
            })
        }
    }

    const writePrivateKey = (privateKey: string) => {
        setWalletPrivateKey(privateKey)
    }



    const createMint = async () => {

        let walletPublic;
        try {

            let payer = Keypair.fromSecretKey(bs58.decode(walletPrivateKey));
            let mintAuth = payer;
            let walletPublic = mintAuth.publicKey;
            let mint = await createMintForToken(payer, walletPublic);
            console.log(mint)
            toast.toast({
                title: `Created the mint token`,
                description: `Mint created at ${mint.mintAddress}, for Mint Authority ${mint.mintAuthority}`,
                variant: "default"
            })
        } catch (e) {
            console.log(e)
            toast.toast({
                title: `Failed creating Mint`,
                description: `Fialed creating the Mint.`,
                variant: "destructive"
            })
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.3,
                ease: "easeInOut",
            }}
            className='min-w-[320px] max-w-[450px] w-[340px] flex flex-col items-start justify-center p-4 gap-y-1 rounded-xl'
            style={{
                backgroundImage
            }}
        >
            <p className='text-xs'><span className='font-extrabold'>Wallet Addres</span><br /><span className='text-[10px]'>{publicKey}</span></p>
            <p className='text-xs'><span className='font-extrabold'>Balance</span><br /><span className='text-[10px]'>SOL {balance.toPrecision(3)}</span></p>
            <p className='text-xs'><span className='font-extrabold'>Executable</span><br /><span className='text-[10px]'>{executable ? "Yes" : "No"}</span></p>
            <div className='w-full flex items-center justify-evenly gap-x-1'>

                <Dialog>
                    <DialogTrigger ><Button className='mx-auto'>Create Mint</Button></DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-green-500 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Create Mint Token.</DialogTitle>
                            <DialogDescription className='flex flex-col items-center justify-center gap-y-2'>
                                <Input placeholder="Private key" className='p-2 rounded-full placeholder:text-slate-500 text-white' onChange={(event) => {
                                    writePrivateKey(event.target.value)
                                }}></Input>
                                <DialogClose onClick={() => createMint()} >
                                    <Button className='rounded-full mx-auto'>Create Mint</Button>
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
                                <DialogClose >
                                    <Button onClick={() => airdrop()} className='rounded-full mx-auto'>Airdrop Solana</Button>
                                </DialogClose>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </motion.div >
    )
}
