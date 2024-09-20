import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
export default function modal() {
    return (
        <div>
            <Dialog>
                <DialogTrigger></DialogTrigger>
                <DialogContent className='bg-gradient-to-r from-teal-500 border-none'>
                    <DialogHeader>
                        <DialogTitle className='my-2'>Create new Wallet</DialogTitle>
                        <DialogDescription>

                            <DialogClose>
                                Close Modal
                            </DialogClose>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
