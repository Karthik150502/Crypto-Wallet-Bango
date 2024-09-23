import React from 'react'
import { useWalletStore } from '@/app/zustand/store'
import { useMnemonicStore } from '@/app/zustand/store';
import WalletComp from './wallet';
import AddWallet from './addWallet';
export default function SolanaWallet() {


    const { wallets } = useWalletStore();
    const { mnemonic } = useMnemonicStore();


    return (
        <div className="w-full flex flex-col items-center justify-center">
            <AddWallet />

            {
                wallets && mnemonic && wallets.map((wallet) => {
                    return <WalletComp key={wallet.publicKey} WalletInfo={wallet} />
                })}
        </div>
    )
}
