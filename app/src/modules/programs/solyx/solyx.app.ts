import { AnchorProvider, Program } from "@project-serum/anchor";
import { get_pda } from "../helper";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
// @ts-ignore
import idl_solyx from './solyx.json'
import { Solyx } from "./types/solyx"

export const SOLYX_PROGRAM_ID = new PublicKey(idl_solyx.metadata.address)

export default class SolyxApp {
    SOLYX_PROGRAM_ID = new PublicKey(idl_solyx.metadata.address)
    PROGRAM: Program<Solyx> | undefined
    ANCHOR_PROVIDER: AnchorProvider | undefined
    SOLYX_PDA: PublicKey | undefined

    constructor(anchor_provider: AnchorProvider) {
        this.PROGRAM = new Program(idl_solyx, SOLYX_PROGRAM_ID, anchor_provider)
        this.ANCHOR_PROVIDER = anchor_provider
        this.SOLYX_PDA = get_pda('solyx_user_account', anchor_provider, SOLYX_PROGRAM_ID)
    }

    /**
     * Check if all configs are set
     * 
     * @returns true if all configs are set
     */
    private check_configs(): boolean {
        if (!this.PROGRAM) return false
        if (!this.ANCHOR_PROVIDER) return false
        if (!this.SOLYX_PDA) return false
        return true
    }

    /**
     * Initialize the account (PDA)
     * 
     */
    public async initialize() {
        if (!this.check_configs) {
            throw new Error("Configs on SolyxApp not set yet")
        }

        const tx_initialize = this.PROGRAM!.methods.initialize().accounts({
            solyxUserAccount: this.SOLYX_PDA!,
            user: this.ANCHOR_PROVIDER!.wallet.publicKey,
            systemProgram: SystemProgram.programId
        })

        this.check_balance_for_tx(await tx_initialize.transaction())

        await tx_initialize.rpc()
    }

    /**
     * Deposit amount to the account
     * 
     * @param amount amount to deposit
     */
    public async deposit(amount: number) {
        if (!this.check_configs) {
            throw new Error("Configs on SolyxApp not set yet")
        }

        const tx_deposit = this.PROGRAM!.methods.deposit(amount).accounts({
            solyxUserAccount: this.SOLYX_PDA!,
            user: this.ANCHOR_PROVIDER!.wallet.publicKey,
        })

        this.check_balance_for_tx(await tx_deposit.transaction())

        await tx_deposit.rpc()
    }

    /**
     * return the data account
     */
    public async fetch_account() {
        if (!this.check_configs) {
            throw new Error("Configs on SolyxApp not set yet")
        }
        return await this.PROGRAM!.account.solyxUserAccount.fetch(this.SOLYX_PDA!)
    }

    /**
     * Just for tx fee
     * 
     * Transactions that modify the state of the program require a fee to be paid.
     * 
     * TX PAID BY USER: create_account, deposit, withdraw,...
    */
    private async check_balance_for_tx(tx: Transaction) {
        const balance = (await this.ANCHOR_PROVIDER?.connection.getBalance(this.ANCHOR_PROVIDER?.wallet.publicKey)!) / LAMPORTS_PER_SOL
        const fee = await this.tx_fee(tx)
        if (balance! < fee) {
            throw new Error(`Not enough balance to pay the fee ${fee} SOL/n Balance: ${balance} SOL`)
        }
    }

    /**
     * Calculate the fee for the transaction
     */
    private async tx_fee(tx: Transaction) {
        const blockhash = await this.ANCHOR_PROVIDER?.connection.getLatestBlockhash()
        tx.recentBlockhash = blockhash!.blockhash
        tx.feePayer = this.ANCHOR_PROVIDER?.wallet.publicKey
        const serialized = tx.compileMessage()
        const fee_lamp = await this.ANCHOR_PROVIDER?.connection.getFeeForMessage(serialized)
        const fee = fee_lamp!.value! / LAMPORTS_PER_SOL
        return fee
    }
}
