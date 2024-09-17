import axios from 'axios'
import { SolanaBalance } from '../types/solana'
import { Connection, PublicKey } from "@solana/web3.js";




export async function getSolBalance(publicKey: string): Promise<any> {
    const rpc_mainnet = "https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
    const rpc_devnet = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"

    // let connection = new Connection(rpc_devnet)


    // let res = await connection.getAccountInfo(new PublicKey("HJqPVkzgWqT8QXQM6dWewbfkcM4Y5EntjFsed5PQGfLe"))


    // console.log(res)



    let res = await axios.post(rpc_devnet, {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey]
    })



    return {
        publicKey,
        slot: res.data.result.context.slot,
        value: res.data.result.value,
        id: res.data.id,
        jsonrpc: res.data.jsonrpc
    }

} 