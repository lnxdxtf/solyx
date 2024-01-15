import * as anchor from "@coral-xyz/anchor";
import { Solyx } from "../target/types/solyx";
import { readFileSync } from 'fs';
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

describe("solyx", async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Solyx as anchor.Program<Solyx>;

  // ACCOUNT THAT THE PROGRAM WILL USE
  const solyx_user_account = await get_pda(program.programId, provider.wallet.publicKey, "solyx_user_account")

  console.log(solyx_user_account);
  

  it("User account balance", async () => {
    let balance = (await check_balance_user(provider.wallet.publicKey)) / LAMPORTS_PER_SOL
    console.log(`user balance: ${balance} SOL`)
    return balance > 0
  });


  it("Initialize", async () => {
    console.log('Check if account is initialized')
    try {

      await program.account.solyxUserAccount.fetch(solyx_user_account)
      console.log('Account initialized found')
    } catch (_) {
      const tx_init = program.methods.initialize().accounts({
        solyxUserAccount: solyx_user_account,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })

      await tx_init.rpc()
      console.log('Initializing account')
    }

  });


  it("Deposit", async () => {
    const amount = 132.0
    const tx_deposit = program.methods.deposit(amount).accounts({
      solyxUserAccount: solyx_user_account,
      user: provider.wallet.publicKey,
    })
    await tx_deposit.rpc()
  })



  it("Check Data", async () => {
    const solyx_user_account_data = await program.account.solyxUserAccount.fetch(solyx_user_account);

    const data = solyx_user_account_data.balanceDataHistory[solyx_user_account_data.balanceDataHistory.length - 1]
    console.log(solyx_user_account_data.balanceDataHistory.length);
    
    console.log("old balance " + data.oldBalance.toString());
    console.log("balance " + data.balance.toString());
    console.log("operation balance " + data.operationBalance.toString());
    console.log("operation time " + data.operationTime.toString());
    console.log("------------------")

  })


});


async function get_pda(program_id: anchor.web3.PublicKey, wallet_pk: anchor.web3.PublicKey, seed: string) {
  const [pda, _] = await PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode(seed),
      wallet_pk.toBuffer(),
    ],
    program_id
  )
  return pda
}

function load_account(path: string): anchor.web3.Keypair {
  const secretKeyString = readFileSync(path, { encoding: 'utf8' });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const user_keypair = anchor.web3.Keypair.fromSecretKey(secretKey);
  return user_keypair;
}

async function check_balance_user(pubkey: anchor.web3.PublicKey): Promise<number> {
  return await anchor.getProvider().connection.getBalance(pubkey);
}
