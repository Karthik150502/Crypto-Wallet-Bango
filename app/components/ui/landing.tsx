'use client'
import React from 'react'
import Button from './button'
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
import AddWallet from './addWallet'
import { Wallet } from '@/app/types/wallet'
import WalletComp from './wallet'
import { useWalletStore, useMnemonicStore } from '@/app/zustand/store'
import WalletTypes from './walletTypes'
import { useToast } from '@/hooks/use-toast'
export default function LandingHero() {

    const [walletCreated, SetWalletCreated] = useState<boolean>(false);
    const [seeds, setSeed] = useState<string[]>([])
    const { addWallet, wallets, deleteWallets } = useWalletStore();
    const { mnemonic, editMnemonic, eraseMnemonic } = useMnemonicStore();
    const toast = useToast();






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


    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="starter flex items-center gap-x-2 my-4 w-full">
                <Button className='' >Import Wallet</Button>
                {
                    walletCreated ?
                        <>

                            <Dialog>
                                <DialogTrigger> <Button className=''>Delete Wallet</Button>
                                </DialogTrigger>
                                <DialogContent className='bg-gradient-to-r from-lime-600 border-none'>
                                    <DialogHeader>
                                        <DialogTitle className='my-2'>Delete Wallet?</DialogTitle>
                                        <DialogDescription>
                                            <div className="w-full flex items-center justify-center animate-pulse">
                                                <DialogClose>
                                                    <Button onClick={() => deleteWallet()} className='bg-red-500  hover:bg-red-600 flex gap-x-2 text-black rounded-full'>Delete Wallet? </Button>
                                                </DialogClose>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </> : <div className='flex items-center justify-center'>
                            <p className='mx-2 text-sm text-center'>Or, if you are only getting Started</p>
                            <Button className='' onClick={() => generateMneMonics()}>Generate Wallet</Button>

                        </div>
                }
            </div>
            {
                walletCreated ? <>
                    <SecretPhrase secretPhrase={seeds} />
                    <AddWallet />
                </> : <></>
            }

            {
                wallets && walletCreated && wallets.map((wallet) => {
                    return <WalletComp publicKey={wallet?.publicKey} privateKey={wallet?.privateKey} name={wallet.name} id={wallet.id} />
                })
            }
        </div >
    )
}
