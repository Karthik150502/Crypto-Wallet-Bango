

export type SolanaBalance = {
    publicKey: string,
    slot: number,
    value: number, // In Lamports
    id: number,
    jsonrpc: string
}

export type SolanaWallet = {
    publicKey: string,
    balance: number
}