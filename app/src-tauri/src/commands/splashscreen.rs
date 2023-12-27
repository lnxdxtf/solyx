use tauri::{Manager, Window};

#[tauri::command]
pub fn close_splashscreen(window: Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    match window.get_window("main") {
        Some(main) => main.show().unwrap(),
        None => println!("No main window found"),
    }
}
