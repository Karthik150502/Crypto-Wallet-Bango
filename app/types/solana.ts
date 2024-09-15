

export type SolanaBalance = {
    publicKey: string,
    slot: number,
    value: number, // In Lamports
    id: number,
    jsonrpc: string
}