'use client'
import React, { useState, useEffect } from 'react'
import { Wallet } from '@/app/types/wallet'
import { Eye, EyeOff, Copy, CopyCheck, Trash, RotateCcwIcon as RotateIcon, BookOpen } from 'lucide-react'
import { useWalletStore } from '@/app/zustand/store'

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate
} from "framer-motion";
import Button from './button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { COLORS_FOR_WALLET } from '@/lib/config'
import PrivateHash from './privateHash'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
export default function WalletComp({ WalletInfo: { publicKey, privateKey, name, id, balance } }: { WalletInfo: Wallet }) {


    const [showPriv, setShowPriv] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedPriv, setCopiedPriv] = useState(false);
    const { deleteWallet } = useWalletStore()
    const router = useRouter()

    // Styling props
    const COLORS = COLORS_FOR_WALLET[Math.floor(Math.random() * COLORS_FOR_WALLET.length)]
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`

    const toast = useToast();


    const copyPublic = () => {
        let timer;
        navigator.clipboard.writeText(publicKey)
        clearTimeout(timer);
        setCopied(true)
        timer = setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    const copyPrivate = () => {
        let timer;
        navigator.clipboard.writeText(privateKey)
        clearTimeout(timer);
        setCopiedPriv(true)
        timer = setTimeout(() => {
            setCopiedPriv(false)
        }, 3000)
    }

    useEffect(() => {
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [])



    const DeleteWallet = (id: string) => {
        deleteWallet(id);
        toast.toast({
            title: `Deleted wallet ${name}`,
            variant: "destructive"
        })
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
            style={{
                backgroundImage
            }}
            className='lg:w-2/3 md:w-full sm:w-full h-auto flex flex-col items-center justify-center my-4 bg-black p-4 rounded-lg'
            id={`wallet-sol-${id}`}
        >
            <div className="header w-full text-right flex items-center justify-between mb-2">
                <p className='text-3xl text-center cursor-pointer text-ellipsis overflow-hidden text-wrap w-2/3 flex items-center gap-x-2' >{name} <BookOpen onClick={() => {
                    router.push(`/walletView/solana/${publicKey}`)
                }} strokeWidth={2} className='animate-pulse coursor-pointer' /></p>
                <p className='text-3xl'>{balance.toPrecision(3)} SOL</p>


                <Dialog>
                    <DialogTrigger onClick={(event) => { event?.stopPropagation() }} ><Trash strokeWidth={1} size={20} /></DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-teal-500 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Delete Wallet {name}?</DialogTitle>
                            <DialogDescription>
                                <div className="w-full flex items-center justify-center animate-pulse">
                                    <DialogClose>
                                        <Button onClick={() => {
                                            DeleteWallet(id)
                                        }} className='bg-red-500  hover:bg-red-600 flex gap-x-2 text-black rounded-full'>Delete Wallet? </Button>
                                    </DialogClose>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div className="cont flex flex-col items-start justify-start gap-y-2 w-full">
                <div className='flex flex-col items-start justify-start w-full'>
                    <p className='text-xl flex gap-x-2 items-center'>Public Key {copied ? <CopyCheck size={18} /> : <Copy onClick={(event) => {
                        event?.stopPropagation()
                        copyPublic()
                    }} size={18} className='cursor-pointer' />}</p>
                    <p className='text-xs w-2/3 h-auto text-wrap text-ellipsis overflow-hidden'>{publicKey}</p>
                </div>
                <div className='flex flex-col items-start justify-start relative w-full'>
                    <p className='text-xl flex gap-x-2 items-center'>Private Key {copiedPriv ? <CopyCheck size={18} /> : <Copy onClick={(event) => {
                        event?.stopPropagation()
                        copyPrivate()
                    }} size={18} className='cursor-pointer' />}</p>
                    <div className="flex w-full items-center justify-between">

                        {
                            showPriv ? <p className='text-xs w-2/3 h-auto text-wrap text-ellipsis overflow-hidden'>{privateKey}</p> : <PrivateHash />
                        }

                        {
                            showPriv ? (<Eye onClick={(event) => {
                                event?.stopPropagation()
                                setShowPriv(false)
                            }} size={18} className='cursor-pointer' />) : <EyeOff onClick={(event) => {
                                event?.stopPropagation()
                                setShowPriv(true)
                            }} size={18} className='cursor-pointer' />
                        }
                    </div>
                </div>
            </div>
        </motion.div >
    )
}
