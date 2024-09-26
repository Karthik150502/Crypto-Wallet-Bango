import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import SendSolana from '@/components/sendSolana/sendSolana'


export default function SendSolanaModal() {
    return (
        <Dialog>
            <DialogTrigger className='rounded-full text-xs bg-white text-black p-2'>Send Solana</DialogTrigger>
            <DialogContent className='border-none bg-transparent'>
                <DialogTitle></DialogTitle>
                <SendSolana enterPrivateKey />
            </DialogContent>
        </Dialog>

    )
}
