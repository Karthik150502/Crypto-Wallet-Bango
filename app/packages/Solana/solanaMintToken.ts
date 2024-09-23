import { createMint } from '@solana/spl-token';
import { Keypair, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const payer = Keypair.fromSecretKey(Uint8Array.from([102, 144, 169, 42, 220, 87, 99, 85, 100, 128, 197, 17, 41, 234, 250, 84, 87, 98, 161, 74, 15, 249, 83, 6, 120, 159, 135, 22, 46, 164, 204, 141, 234, 217, 146, 214, 61, 187, 254, 97, 124, 111, 61, 29, 54, 110, 245, 186, 11, 253, 11, 127, 213, 20, 73, 8, 25, 201, 22, 107, 4, 75, 26, 120]));



const mintAthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));


const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

export async function createMintForToken(payer: Keypair, mintAuthority: PublicKey) {
    const mint = await createMint(
        connection,
        payer,
        mintAuthority,
        null,
        6,
        undefined,
        undefined,
        TOKEN_PROGRAM_ID
    );
    console.log('Mint created at', mint.toBase58());

    return {
        mint,
        mintAuthority,
        mintAddress: mint.toBase58()
    };
}

// async function main() {
//     const mint = await createMintForToken(payer, mintAthority.publicKey);
// }

// main();
