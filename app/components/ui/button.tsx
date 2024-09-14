'use client'
import React from 'react'
import clsx from 'clsx'

type Props = {
    type?: "button" | "submit" | undefined,
    className?: string,
    onClick?: () => void,
    children?: React.ReactNode
}

export default function Button({ onClick, type, className, children }: Props) {
    return (
        <button onClick={onClick} type={type || "button"} className={clsx("w-fit px-2 py-2 h-auto flex items-center justify-around bg-white hover:bg-slate-300 text-black text-sm", className)}>{children}</button>
    )
}
