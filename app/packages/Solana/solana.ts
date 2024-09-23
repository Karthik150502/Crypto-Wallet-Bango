import { Connection, PublicKey } from '@solana/web3.js'




import { SolanaUtilAbs } from './solanaAbs'


export class SolanaUtils implements SolanaUtilAbs {

    private static instance: Connection;
    private static rpc: string;

    private constructor() {
    }

    public static setRpc(rpcString: string) {
        this.rpc = rpcString
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Connection(this.rpc);
        }
        return this.instance
    }

    public getBalance(publicKey: string): Promise<number> {
        return SolanaUtils.getInstance().getBalance(new PublicKey(publicKey))
    }
}