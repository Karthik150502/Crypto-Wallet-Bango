import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useMnemonicStore, useWalletStore } from '@/app/zustand/store';
import { useToast } from '@/hooks/use-toast';
export default function RemoveWallet() {


    const [walletCreated, SetWalletCreated] = useState<boolean>(false);
    const { deleteWallets } = useWalletStore();
    const { eraseMnemonic } = useMnemonicStore();
    const toast = useToast();


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
    )
}
