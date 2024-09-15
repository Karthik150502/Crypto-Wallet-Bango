import axios from 'axios'
import { SolanaBalance } from '../types/solana'

export async function getSolBalance(publicKey: string): Promise<SolanaBalance> {
    let res = await axios.post("https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0", {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey]
    })

    console.log(res)

    return {
        publicKey,
        slot: res.data.result.context.slot,
        value: res.data.result.value,
        id: res.data.id,
        jsonrpc: res.data.jsonrpc
    }

} 