'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion';
import { LAMPORTS_PER_SOL, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { useMnemonicStore, useWalletStore } from '@/app/zustand/store';

import { getPublicKeyMnemonicSolana } from '@/lib/client_actions';
import { useToast } from '@/hooks/use-toast';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { getPublicKeyMnemonicEther } from '@/lib/ethers';
import { Input } from '@/components/ui/input';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';



import { getSolBalance } from '@/app/api/solana';










export default function AddWallet() {
    const toast = useToast();
    const { mnemonic, editMnemonic } = useMnemonicStore();
    const { addWallet, wallets } = useWalletStore();
    const [walletName, setWalletName] = useState<string>('')
    const QUICKNODE_RPC = 'https://example.solana.quiknode.pro/000000/'; // Replace with your QuickNode Endpoint OR clusterApiUrl('mainnet-beta')
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    const WALLET_ADDRESS = 'YOUR_WALLET_ADDRESS'; //👈 Replace with your wallet address



    const createWallet = async () => {

        try {
            const { publicKey, privateKey } = getPublicKeyMnemonicSolana(mnemonic, wallets.length + 1);

            let walletInfo = await getSolBalance(publicKey);
            console.log(walletInfo)


            addWallet(publicKey, privateKey, walletName, walletInfo.value)
            toast.toast({
                title: `Created wallet ${walletName}`,
                variant: "default"
            })
            console.log(publicKey, privateKey)
        } catch (e) {
            toast.toast({
                title: `Wallet not created`,
                description: 'Wallet was not created due to some error'
            })
        }
    }





    const handleChange = (event: any) => {
        setWalletName(event.target.value)
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
            className='w-full' >

            <div className="header flex items-start justify-start">
                <Dialog>
                    <DialogTrigger> <Button className='bg-teal-500 rounded-none hover:bg-teal-600 flex gap-x-2'>Add Wallet <Plus /></Button></DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-teal-500 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Create new Wallet</DialogTitle>
                            <DialogDescription>
                                <Input onChange={(event) => { handleChange(event) }} name='name' placeholder='_____ aka wallet.' className='placeholder:text-white text-white'></Input>
                                <div className="w-full flex items-center justify-center my-4 ">
                                    <DialogClose>
                                        <Button onClick={() => createWallet()} className='bg-white hover:bg-slate-200 flex gap-x-2 text-black rounded-full'>Create Wallet<Plus /></Button>
                                    </DialogClose>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </motion.div >
    )
}
