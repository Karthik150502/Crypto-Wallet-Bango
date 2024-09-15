import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import * as secp from "@noble/secp256k1";
import { derivePath } from "ed25519-hd-key";
import bs58 from 'bs58';
import { useMnemonicStore } from "@/app/zustand/store";
export function getPublicKeyMnemonicSolana(mnemonic: string, walletNo: number) {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${walletNo}'/0'`; //This is the derivation path;
    const derivedPath = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedPath).secretKey;
    return {
        publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
        privateKey: bs58.encode(secret)
    }
}