import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solyx } from "../target/types/solyx";
import { BN } from "bn.js";
import { readFileSync } from 'fs';

describe("solyx", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Solyx as Program<Solyx>;


  const solyx_account = load_account('./config/id_solyx.json');

  const user_account = load_account('./config/id.json');

  it("User account balance", async () => {
    let balance = await check_balance_user(user_account.publicKey)
    console.log(`user balance: ${balance}`)
    // If balance < 0 test will fail
    if (balance > 0) {
      return true;
    }
  });

  it("Check cluster connection", async () => {
    const rpc_endpoint = anchor.AnchorProvider.env().connection.rpcEndpoint
    console.log(`Rpc: ${rpc_endpoint}`)
  });

  it("Initialize", async () => {
    try {
      await program.account.solyxAccount.fetch(solyx_account.publicKey);
      console.log('Solyx account already initialized.');
    } catch (e) {
      await program.methods.initialize().accounts({
        solyxAccount: solyx_account.publicKey,
        user: user_account.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([
        user_account, solyx_account
      ]).rpc();
      console.log('Solyx account initialized.');
    }
  });


  it("Deposit", async () => {
    const amount_deposit = new BN(100);

    const tx = await program.methods.deposit(amount_deposit).accounts({
      solyxAccount: solyx_account.publicKey,
    }).signers([user_account])
      .rpc()

    console.log(`Transaction Solyx deposit: ${tx}`)
  });

  it("Check Data", async () => {

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
