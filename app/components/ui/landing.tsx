'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { getMnemonics } from '@/lib/actions'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import SecretPhrase from './secretPhrase'
import { useWalletStore, useMnemonicStore } from '@/app/zustand/store'
import { useToast } from '@/hooks/use-toast'
import SolanaWallet from './solanaWallet'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'



export default function LandingHero() {

    const [walletCreated, SetWalletCreated] = useState<boolean>(false);
    const [seeds, setSeed] = useState<string[]>([])
    const { addWallet, wallets, deleteWallets } = useWalletStore();
    const { mnemonic, editMnemonic, eraseMnemonic } = useMnemonicStore();
    const [mnemonicImp, setMnemonicImp] = useState<string>("");
    const toast = useToast();
    const router = useRouter();






    const generateMneMonics = () => {
        let seeds = getMnemonics();
        console.log(seeds)
        editMnemonic(seeds);
        setSeed((prev) => seeds.split(" "));
        SetWalletCreated(true)
    }



    const deleteWallet = () => {
        eraseMnemonic()
        deleteWallets()
        toast.toast({
            title: "Wallet Deleted",
            variant: "destructive"
        })
        SetWalletCreated(false)
    }

    const importWallet = () => {
        editMnemonic(mnemonicImp)
        setSeed((prev) => mnemonicImp.split(" "));
    }



    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="starter flex items-center gap-x-2 my-4 w-full justify-center">

                <Dialog>

                    <DialogTrigger className='rounded-full bg-gray-700 hover:bg-gray-600 p-2 transition-colors text-sm px-4'>
                        Import Wallet
                    </DialogTrigger>
                    <DialogContent className='bg-gradient-to-r from-purple-600 border-none'>
                        <DialogHeader>
                            <DialogTitle className='my-2'>Enter the secret seed phrase?</DialogTitle>
                            <DialogDescription>
                                <Input onChange={(event) => { setMnemonicImp(event.target.value) }} name='name' placeholder='Enter a the seed phrase.' className='placeholder:text-white text-white' />
                                <div className="w-full flex items-center justify-center my-4 ">
                                    <DialogClose>
                                        <Button onClick={() => importWallet()} className='bg-white hover:bg-slate-200 flex gap-x-2 text-black rounded-full'>Import</Button>
                                    </DialogClose>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button className='rounded-full bg-gray-700 hover:bg-gray-600' onClick={() => {
                    router.push("/token-launchpad")
                }}>Open Token Launcpad</Button>
                {
                    mnemonic ?
                        <Dialog>
                            <DialogTrigger className='rounded-full bg-gray-700 hover:bg-gray-600 p-2 transition-colors text-sm px-4'>
                                Remove Wallet
                            </DialogTrigger>
                            <DialogContent className='bg-gradient-to-r from-lime-600 border-none'>
                                <DialogHeader>
                                    <DialogTitle className='my-2 '>Delete Wallet?</DialogTitle>
                                    <DialogDescription>
                                        <div className="w-full flex items-center justify-center animate-pulse">
                                            <DialogClose>
                                                <Button onClick={() => deleteWallet()} className='bg-red-500  hover:bg-red-600 flex gap-x-2 text-black rounded-full'>Delete Wallet?</Button>
                                            </DialogClose>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        :
                        <div className='flex items-center justify-between px-4 gap-x-2'>
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
