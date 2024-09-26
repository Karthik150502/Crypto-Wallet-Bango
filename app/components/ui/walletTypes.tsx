'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });


function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        animate(
            "ul",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );

        animate(
            "li",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen]);

    return scope;
}


export default function WalletTypes() {
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);
    return (
        <div className=''>
            <nav className="menu" ref={scope}>
                <div
                    style={{
                        position: "fixed",
                        bottom: -210,
                        left: 200,
                        width: 100,
                        height: 100,
                        background: "white",
                    }}
                />
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className='bg-white flex items-center justify-between rounded-none text-black px-5 py-1'
                >
                    Generate new Waltet
                    <div className="arrow ml-2" style={{ transformOrigin: "50% 55%" }}>
                        <svg width="15" height="15" viewBox="0 0 20 20">
                            <path d="M0 7 L 20 7 L 10 16" />
                        </svg>
                    </div>
                </motion.button>
                <ul
                    style={{
                        pointerEvents: isOpen ? "auto" : "none",
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                    }}
                    className='mt-2 rounded-none'
                >

                    <li className='bg-white text-black flex items-center justify-center hover:bg-slate-300 rounded-none transition-colors'>Solana</li>
                    <li className='bg-white text-black flex items-center justify-center hover:bg-slate-300 rounded-none transition-colors'>Bitcoin</li>
                    <li className='bg-white text-black flex items-center justify-center hover:bg-slate-300 rounded-none transition-colors'>Ethereum</li>
                </ul>{" "}
            </nav>
        </div>
    )
}
