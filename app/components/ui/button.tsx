'use client'
import React from 'react'
import clsx from 'clsx'

type Props = {
    type?: "button" | "submit" | undefined,
    className?: string,
    onClick?: (event: any) => void,
    children?: React.ReactNode,
    disabled?: boolean
}

export default function Button({ onClick, type, className, children, disabled }: Props) {
    return (
        <button onClick={onClick} type={type || "button"} className={clsx(className, "w-fit px-2 py-2 h-auto flex items-center transition-color justify-around bg-white hover:bg-slate-300 text-black text-xs")} disabled={disabled}>{children}</button>
    )
}
