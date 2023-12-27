use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

pub fn build_system_tray() -> SystemTray {
    let system_tray = SystemTray::new().with_menu(build_system_tray_menu());
    system_tray
}

fn build_system_tray_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");

    let menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(show);
    menu
}

#[allow(unused)]
pub fn system_tray_handler(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { tray_id, id, .. } => match id.as_str() {
            "quit" => {
                app.exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            "show" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
            }
            _ => {}
        },
        SystemTrayEvent::LeftClick {
            tray_id, position, ..
        } => {}
        SystemTrayEvent::RightClick {
            tray_id, position, ..
        } => {}
        SystemTrayEvent::DoubleClick {
            tray_id, position, ..
        } => {}
        _ => {}
    }
}
