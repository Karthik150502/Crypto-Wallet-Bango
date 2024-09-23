'use client'
import React from 'react'


type Props = {
    slot: number,
    jsonrpc: string,
    value?: number,
    id: number,
    publicKey: string
}

export default function WalletView({ slot, jsonrpc, value, id, publicKey }: Props) {


    return (
        <div className='flex flex-col items-start justify-center gap-y-2'>
            <p><span className='font-extrabold text-sm'>Public Address: </span><span className='font-thin text-sm'>{publicKey}</span></p>
            <p><span className='font-extrabold text-sm'>Balance: </span>{value || 0} SOL<span className='font-thin text-sm'></span></p>
            <p><span className='font-extrabold text-sm'>Id: </span><span className='font-thin text-sm'>{id}</span></p>
            <p><span className='font-extrabold text-sm'>Slot: </span><span className='font-thin text-sm'>{slot}</span></p>
        </div>
    )
}
