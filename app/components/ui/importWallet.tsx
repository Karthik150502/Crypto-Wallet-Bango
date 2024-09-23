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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMnemonicStore } from '@/app/zustand/store';




export default function ImportWallet() {


    const [mnemonicImp, setMnemonicImp] = useState<string>("");
    const { editMnemonic } = useMnemonicStore();
    const [seeds, setSeed] = useState<string[]>([])


    const importWallet = () => {
        editMnemonic(mnemonicImp)
        setSeed((prev) => mnemonicImp.split(" "));
    }

    return (
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
    )
}
