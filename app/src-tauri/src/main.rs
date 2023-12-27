// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod systemtray;
use commands::{account::import_keypair_seed_pass, splashscreen::close_splashscreen};
use systemtray::{build_system_tray, system_tray_handler};
fn main() {
    tauri::Builder::default()
        .system_tray(build_system_tray())
        .on_system_tray_event(|app, event| system_tray_handler(app, event))
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            import_keypair_seed_pass,
        ])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
