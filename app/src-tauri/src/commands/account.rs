use serde::Serialize;
use solana_sdk::{
    account::Account,
    pubkey::Pubkey,
    signer::{keypair::Keypair, SeedDerivable, Signer},
};
use std::sync::mpsc;
use tauri::{api::dialog::message, Result, Window};

use solana_client::rpc_client::RpcClient;

#[derive(Serialize)]
pub enum KeypairDataImport {
    Ok((Pubkey, Account)),
    Err,
}

#[tauri::command]
pub fn import_keypair_seed_pass(
    window: Window,
    client_url: String,
    seed_phrase: String,
    passphrase: String,
) -> Result<KeypairDataImport> {
    let (tx, rx) = mpsc::channel();
    match Keypair::from_seed(seed_phrase.as_bytes()) {
        Ok(kp) => {
            let client = RpcClient::new(client_url);
            let pubkey = kp.pubkey();
            match client.get_account(&pubkey) {
                Ok(account) => {
                    let data = KeypairDataImport::Ok((pubkey, account));
                    tx.send(data).unwrap();
                }
                Err(_) => {
                    message(Some(&window), "Solyx Error", "Cannot find account");
                    let data = KeypairDataImport::Err;
                    tx.send(data).unwrap();
                }
            }
        }
        Err(_) => message(
            Some(&window),
            "Solyx",
            "Error importing keypair by seed phrase and passphrase",
        ),
    }
    let received = rx.recv().unwrap();
    Ok(received)
}
