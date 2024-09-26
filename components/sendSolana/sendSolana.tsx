'use client'
import Image from 'next/image';
import { Input } from '../ui/input';
import React, { useState } from 'react'
import logo from '@/assets/Solana/solanaLogoMark.svg'
import Button from '@/app/components/ui/button';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import bs58 from 'bs58'
export default function SendSolana({ enterPrivateKey }: { enterPrivateKey?: boolean }) {


    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('')
    const [privateKey, setPrivate] = useState('')
    const wallet = useWallet();
    const { connection } = useConnection();
    const { toast } = useToast();

    const sendSolana = async () => {
        if (!wallet) {
            toast({
                title: "Transaction failed.",
                description: "Kindly connect the wallet.",
                variant: "default"
            })
            return
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey!,
                    toPubkey: new PublicKey(address),
                    lamports: Number(amount) * LAMPORTS_PER_SOL
                })
            )

            const sign = await wallet.sendTransaction(transaction, connection)
            await connection.confirmTransaction(sign);
            toast({
                title: "Transaction Success.",
                description: `${amount} SOL to ${address} successful.`,
                variant: "default"
            })
        } catch (e) {
            toast({
                title: "Transaction failed.",
                description: "Some error occured, and transaction failed",
                variant: "default"
            })
        }

    }


    const sendSolanaManual = async () => {

        const rpc_devnet = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
        const rpc_devnet_default = clusterApiUrl("devnet");
        const connectionManual = new Connection(rpc_devnet, "confirmed")
        const from = Keypair.fromSecretKey(bs58.decode(privateKey!))
        try {
            const transaction = new Transaction()
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: from.publicKey,
                    toPubkey: new PublicKey(address),
                    lamports: Number(amount) * LAMPORTS_PER_SOL
                }),
            );


            const signature = await connectionManual.sendTransaction(transaction, [from])

            // const signature = await sendAndConfirmTransaction(
            //     connectionManual,
            //     transaction,
            //     [signer],
            // );
            console.log('SIGNATURE', signature);
            toast({
                title: "Transaction success.",
                description: `Transaction of ${amount} SOL from ${from.publicKey.toBase58()} to ${address} successfully completed.`,
                variant: "default"
            })
        } catch (e) {
            console.log(e)
            toast({
                title: "Transaction failed.",
                description: `Transaction of ${amount} SOL from ${from.publicKey.toBase58()} to ${address} failed.`,
                variant: "destructive"
            })
        }
    }


    return (
        <section className='flex flex-col items-center justify-center'>
            <div className="flex items-center justify-center gap-x-3">
                <p className='text-6xl font-extrabold text-center'><i>SOLANA</i></p>
                <Image src={logo} height={60} width={60} alt="Solana Logo" />
            </div>
            <div className='flex lg:flex-row md:flex-row sm:flex-col xs:flex-col items-center justify-center gap-x-2 gap-y-2'>
                <section className='min-w-[320px] w-360px max-w-[450px] h-[250px] p-8 rounded-none flex flex-col items-center justify-center gap-y-4 bg-gradient-to-tr from-[#9747FE] to-[#1FF0A7]'>

                    {
                        enterPrivateKey && <label htmlFor="from-private" className='w-full flex flex-col items-start justify-center gap-y-1'>
                            <p className='text-xs font-extrabold'>Private Key</p>
                            <Input id='private' onChange={(e) => { setPrivate(e.target.value) }} type='password' className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Private Key' />
                        </label>
                    }


                    <label htmlFor="address" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>To Address</p>
                        <Input id='address' onChange={(e) => { setAddress(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Name of your Token' />
                    </label>

                    <label htmlFor="amount" className='w-full flex flex-col items-start justify-center gap-y-1'>
                        <p className='text-xs font-extrabold'>Amount</p>
                        <Input id="amount" onChange={(e) => { setAmount(e.target.value) }} className='rounded-full p-4 shadow-2xl placeholder:text-gray-600 placeholder:text-[10px] text-xs' placeholder='Example, Like for SOLANA it is SOL' />
                    </label>

                </section>

            </div>
            <Button onClick={() => {
                enterPrivateKey ? sendSolanaManual() : sendSolana()
            }} className='text-black bg-slate-100 hover:bg-slate-300 transition-colors my-2 p-4 rounded-full'>Send Solana</Button>
        </section>
    )
}
