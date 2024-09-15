'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion';

import { useMnemonicStore, useWalletStore } from '@/app/zustand/store';

import { getPublicKeyFromMnemonic } from '@/lib/client_actions';


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input';
export default function AddWallet() {

    const { mnemonic, editMnemonic } = useMnemonicStore();
    const { addWallet, wallets } = useWalletStore();
    const [walletName, setWalletName] = useState<string>('')


    const createWallet = () => {
        const { publicKey, privateKey } = getPublicKeyFromMnemonic(mnemonic, wallets.length + 1);
        addWallet(publicKey, privateKey, walletName)
        console.log(publicKey, privateKey)
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
