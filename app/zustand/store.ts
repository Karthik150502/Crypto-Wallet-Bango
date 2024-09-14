import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Wallet } from "../types/wallet"



type WalletStore = {
    wallets: Wallet[],
    addWallet: () => void,
    deleteWallets: () => void,
    deleteWallet: (id: string) => void,
}



const walletStore = (set: any) => ({
    wallets: [],
    addWallet: (publicKey: string, privateKey: string, name: string,) => set((store: any) => ({
        wallets: [...store.wallets, { publicKey, privateKey, name, id: store.wallets.length + 1 }]
    })),
    deleteWallets: () => set((store: any) => ({
        wallets: [],
    })),

    deleteWallet: (id: string) => set((store: any) => ({
        wallets: store.wallets.filter((wallet: Wallet) => wallet.id !== id),
    })),

})



const mnemonicStore = (set: any) => ({
    mnemonic: "",
    editMnemonic: (mnemonic: string) => set((store: any) => ({
        mnemonic: mnemonic
    })),
    eraseMnemonic: () => set((store: any) => ({
        mnemonic: ""
    })),
})



export const useWalletStore = create(walletStore);
export const useMnemonicStore = create(mnemonicStore);