'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE } from '@solana/spl-token'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
import { clusterApiUrl, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import logo from '@/assets/Solana/solanaLogoMark.svg'

import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, setAuthority, transfer } from "@solana/spl-token";
import WalletAdapterBrewed from '../ui/walletAdapter'
import WalletTypes from '@/app/components/ui/walletTypes'
import SendSolana from '../sendSolana/sendSolana'
export default function SolanaTokenLaunchpad() {




    const toast = useToast();
    const wallet = useWallet();
    const connection = useConnection();

    const [decimals, setDecimals] = useState<string>('')
    const [symbol, setSymbol] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [tokenName, setTokenName] = useState<string>('')
    const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')




    const createToken = async () => {
        if (!wallet) {
            toast.toast({
                title: "Kindly connect to the wallet",
                variant: "destructive"
            })
            return
        }
        wallet.publicKey
        let connectionRaw = new Connection(clusterApiUrl("devnet"), "confirmed")
        const lamports = await getMinimumBalanceForRentExemptMint(connectionRaw);
        const keypair = Keypair.generate();

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, Number(decimals), wallet.publicKey!, wallet.publicKey!, TOKEN_PROGRAM_ID)
        );

        transaction.partialSign(keypair)
        wallet.signTransaction(transaction)
        return keypair.publicKey;
    }


    return (
        <section className='flex flex-col items-center justify-center'>
            <div className="flex items-center justify-center gap-x-3">
                <p className='text-6xl font-extrabold text-center'><i>SOLANA</i></p>
                <Image src={logo} height={60} width={60} alt="Solana Logo" />
            </div>
            <div className='flex lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center justify-center gap-x-2 gap-y-2'>
                <section className='min-w-[320px] w-360px max-w-[450px] h-[300px] p-8 rounded-none flex flex-col items-center justify-center gap-y-4 bg-gradient-to-tr from-[#9747FE] to-[#1FF0A7]'>
                    <label htmlFor="token-name" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Token Name</p>
                        <Input id='token-name' onChange={(e) => { setTokenName(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Name of your Token' />
                    </label>

                    <label htmlFor="token-symbol" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Token Symbol</p>
                        <Input id="token-symbol" onChange={(e) => { setSymbol(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Example, Like for SOLANA it is SOL' />
                    </label>
                    <label htmlFor="token-decimal" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Decimals</p>
                        <Input id="token-decimal" onChange={(e) => { setDecimals(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='1 Token = X Lamports' />
                    </label>
                    <label htmlFor="token-img" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Token Image</p>
                        <Input id="token-img" onChange={(e) => { setImg(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Image for your token' />
                    </label>

                </section>
                {/* <section className='min-w-[320px] w-360px max-w-[450px] h-[300px] border-green-400 bg-[#1c1c1e] p-4 rounded-none'></section> */}
            </div>
            <Button onClick={createToken} className='text-black bg-slate-100 hover:bg-slate-300 transition-colors my-2 p-4 rounded-full'>Create Token</Button>
            {/* <WalletAdapterBrewed /> */}
        </section>
    )
}
