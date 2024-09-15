import { HDNodeWallet, Wallet as EtherWallet } from "ethers";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import * as secp from "@noble/secp256k1";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';
import { useMnemonicStore } from "@/app/zustand/store";



export function getPublicKeyMnemonicEther(mnemonic: string, walletNo: number) {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/60'/${walletNo}'/0'`;

    const secret = deriveEthereumPrivateKey(seed, path);
    const wallet: EtherWallet = deriveEthereumWallet(seed, path);



    console.log("Ethereum wallet = ", wallet)
    console.log("Ethereum wallet address = ", wallet.address)
    console.log("Ethereum wallet privateKey = ", wallet.signingKey.privateKey)
    console.log("Ethereum wallet publicKey = ", wallet.signingKey.publicKey)

    return {

        publicKey: wallet.signingKey.publicKey,
        privateKey: wallet.signingKey.privateKey
    }

}

export function deriveEthereumPrivateKey(
    seed: Buffer,
    derivationPath: string
): string {
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    return child.privateKey;
}


export function deriveEthereumWallet(
    seed: Buffer,
    derivationPath: string
): EtherWallet {
    const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
    return new EtherWallet(privateKey);
}

export function getEthereumWallet(privateKey: string): EtherWallet {
    let wallet: EtherWallet;
    try {
        wallet = new EtherWallet(privateKey);
    } catch {
        throw new Error("Invalid Ethereum private key");
    }
    return wallet;
}