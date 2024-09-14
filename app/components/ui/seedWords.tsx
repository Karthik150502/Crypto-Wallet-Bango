import React from 'react'
import Button from './button'


type Props = {
    words: string[]
}

export default function SeedWords({ words }: Props) {
    console.log(words)
    return (
        <div className='w-full h-auto grid grid-cols-4 grid-rows-3 gap-x-3 gap-y-3 grid-flow-row my-4'>
            {
                words.map((word) => {
                    return <div key={word} className='w-full h-auto px-2 py-2 bg-gray-500 text-black text-center text-sm hover:bg-slate-200'>{word}</div>
                })
            }
        </div>
    )
}
