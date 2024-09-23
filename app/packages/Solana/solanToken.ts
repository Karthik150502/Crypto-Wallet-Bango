import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from "@solana/web3.js"

import axios from "axios";
import bs58 from 'bs58';
export async function getAccount(publicKey: string) {




    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

    let res = await connection.getAccountInfo(new PublicKey(publicKey))
    return res
}



export async function airDropSol(publicKey: string, amount: number) {

    let devnetApi = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
    const connection = new Connection(devnetApi, "confirmed");
    // Using adaptor
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount * LAMPORTS_PER_SOL);
    // let signature = await connection.confirmTransaction({ signature: airdropSignature })
    let signature = await connection.confirmTransaction(airdropSignature)

    return signature
    ////Method 2
    // let res = await axios.post(devnetApi, {
    //     jsonrpc: "2.0",
    //     id: 1,
    //     method: "requestAirdrop",
    //     params: [publicKey, amount * LAMPORTS_PER_SOL]
    // })
    // console.log(res.data)
    // return res.data

}
// airDropSol("GokppTzVZi2LT1MSTWoEprM4YLDPy7wQ478Rm3r77yEw", LAMPORTS_PER_SOL).then(signature => {
//     console.log('Airdrop signature:', signature);
// });