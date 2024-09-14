import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';



export function getMnemonics(phraseLength: number = 12) {
    const mnemonic = generateMnemonic(phraseLength === 12 ? 128 : 256);
    const seed = mnemonicToSeedSync(mnemonic);
    return mnemonic
}



export function getWallets(noOfWallets: number, mnemonic: string) {
    let res = []
    for (let i = 0; i < noOfWallets; i++) {
        res.push(getPublicKeyFromMnemonic(mnemonic, i));
    }
    return res;
}



export function getPublicKeyFromMnemonic(mnemonic: string, walletNo: number) {

    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${walletNo}'/0'`; //This is the derivation path;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    localStorage.setItem('bango-wallets', `${walletNo}`)
    return {
        publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
        privateKey: bs58.encode(secret)
    }
}