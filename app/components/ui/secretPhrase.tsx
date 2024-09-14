"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import SeedWords from './seedWords';
import { CopyCheck, Copy } from 'lucide-react';
type Props = {
    secretPhrase: string[]
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"




export default function SecretPhrase({ secretPhrase }: Props) {

    const [copied, setCopied] = useState<boolean>(false);


    const copyText = () => {
        let timer;
        clearTimeout(timer)
        setCopied(true)
        navigator.clipboard.writeText(secretPhrase.join(' '))
        setTimeout(() => {
            setCopied(false)
        }, 3000)
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
            className='flex lg:flex-row md:flex-col-reverse sm:flex-col-reverse items-center justify-center w-full my-4 gap-x-4'>
            <Accordion type="single" collapsible className='w-full'>
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger>
                        <p className='text-4xl'>Secret phrase</p>
                    </AccordionTrigger>
                    <AccordionContent className=''>
                        <SeedWords words={secretPhrase} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className='flex flex-col items-center justify-center gap-x-2 px-4'>
                <p className='text-7xl'>Attention!</p>
                <p className='text-sm text-center'>Save these words securely, it will be the master key for you to access all your accounts when push comes to shove. &nbsp;&nbsp;
                </p>
                {
                    copied ? <span className='flex gap-x-1 items-center'>Copied <CopyCheck size={18} /></span> : <span onClick={() => copyText()} className='cursor-pointer flex gap-x-1 items-center'>Copy Phrase <Copy size={18} /></span>
                }
            </div>

        </motion.div>
    )
}
