import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { readFileSync } from 'fs';
import { SolyxToken } from "../target/types/solyx_token";

describe("solyx", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);

    const payer = provider.wallet as anchor.Wallet
    const program = anchor.workspace.SolyxToken as Program<SolyxToken>;
    const metadata_token = {
        name: "JuninToken",
        symbol: "JUNT",
        uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
    }
    const mintKP = load_account("./config/id.json")

    it("Creating SPL TOKEN", async () => {
        const kp = new anchor.web3.Keypair();
        const [metadataAddress] = anchor.web3.PublicKey.findProgramAddressSync([
            Buffer.from("metadata"),
            program.programId.toBuffer(),
            mintKP.publicKey.toBuffer(),
        ], program.programId)
    })

});


function load_account(path: string): anchor.web3.Keypair {
    const secretKeyString = readFileSync(path, { encoding: 'utf8' }); 
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const user_keypair = anchor.web3.Keypair.fromSecretKey(secretKey);
    return user_keypair;
}

async function check_balance_user(pubkey: anchor.web3.PublicKey): Promise<number> {
    const balance = await anchor.getProvider().connection.getBalance(pubkey);
    return balance;
}
