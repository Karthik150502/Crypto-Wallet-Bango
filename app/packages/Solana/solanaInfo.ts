
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import axios from "axios";


export async function getWalletInfo(pubKey: string) {

    let rpc_devnet = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
    const connection = new Connection(rpc_devnet, "confirmed")

    let pubKeyBase58: PublicKey = new PublicKey(pubKey)

    // let res = await connection.getAccountInfo(pubKeyBase58)
    let res = await axios.post(rpc_devnet, {
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [pubKeyBase58]
    })

    console.log(res)
    return res
}