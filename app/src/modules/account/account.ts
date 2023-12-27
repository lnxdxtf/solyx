import { invoke } from '@tauri-apps/api/tauri'

export class Account {
    public async connect() { }
}

export async function import_keypair_seed_pass(clientUrl: string, seedPhrase: string, passphrase: string): Promise<any> {
    return await invoke("import_keypair_seed_pass", { clientUrl: clientUrl, seedPhrase: seedPhrase, passphrase: passphrase })
}

