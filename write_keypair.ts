import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { writeFile } from 'fs';
import { Keypair } from "@solana/web3.js"

function main() {
    const pk = ""
    const file = "./config/wallet_id.json"
    generate_keypair_from_pk(pk, file)
}

function generate_keypair_from_pk(pk: string, file: string) {
    const pk_bytes = bs58.decode(pk)
    const kp = Keypair.fromSecretKey(pk_bytes)
    const kp_json = JSON.stringify(Array.from(kp.secretKey))
    writeFile(file, kp_json, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Keypair saved in ./config/wallet_id.json');

    })
}

main()