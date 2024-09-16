import { Connection, PublicKey } from '@solana/web3.js'




import { SolanaUtilAbs } from './solanaAbs'


export class SolanaUtils implements SolanaUtilAbs {

    private static instance: Connection | undefined;


    private constructor() {
    }

    public static getInstance(rpcEndpoint: string) {
        if (!this.instance) {
            this.instance = new Connection(rpcEndpoint);
        }

        return this.instance
    }


    public getBalance(publicKey: string): Promise<number> {
        return this.instance?.getBalance(new PublicKey(publicKey))
    }



}