import { Commitment, ConfirmOptions, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, utils } from "@project-serum/anchor";

// const { SystemProgram, Keypair } = web3;

export const NETWORK = get_network()

const opts = {
    preflightCommitment: "processed"
}

function get_network(): string {
    const network = import.meta.env.SOLYX_NETWORK ?? "localnet"
    switch (network) {
        case "devnet":
            return clusterApiUrl("devnet")
        case "mainnet-beta":
            return clusterApiUrl("mainnet-beta")
        case "testnet":
            return clusterApiUrl("testnet")
        case "localnet":
            return "http://127.0.0.1:8899"
        default:
            return "http://127.0.0.1:8899"
    }
}


export function get_anchor_provider(solana_provider: any) {
    const connection = new Connection(NETWORK, opts.preflightCommitment as Commitment)
    return new AnchorProvider(connection, solana_provider, opts.preflightCommitment as ConfirmOptions)
}

export function get_pda(seed: string, provider: AnchorProvider, program_id: PublicKey): PublicKey {
    const [pda, _bump] = PublicKey.findProgramAddressSync(
        [
            utils.bytes.utf8.encode(seed),
            provider.wallet.publicKey.toBuffer(),
        ],
        program_id
    )
    return pda
}

export enum SolyxError {
    ACCOUNT_NOT_FOUND = "Account not found",
    ACCOUNT_ALREADY_EXISTS = "Account already exists",
    NOT_ENOUGH_FUNDS = "Not enough funds",
}