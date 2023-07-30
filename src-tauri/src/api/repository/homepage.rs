pub mod homepage {
    //necc crates imports for the module
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use libloading::{Library, Symbol};
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::{json, Value};
    use std::path::PathBuf;
    use tauri::api::{window, screen::Screen};
    use winapi::shared::windef::HWND;
    use winapi::um::shellapi::NIM_ADD;
    use winapi::um::winuser::{FindWindowW, ShowWindow, SW_HIDE, SW_SHOW};
    use winapi::um::shellapi::{Shell_NotifyIconW, NOTIFYICONDATAW, NIF_MESSAGE, NIF_TIP};
    use std::ptr::null_mut;
    use std::mem::zeroed;
    use std::thread::spawn;


    fn hide_taskbar() {
    let hwnd_taskbar = unsafe { FindWindowW("Shell_TrayWnd\0".as_ptr() as *const _, null_mut()) };
    if !hwnd_taskbar.is_null() {
        unsafe { ShowWindow(hwnd_taskbar, SW_HIDE) };
    }
}

fn show_taskbar() {
    let hwnd_taskbar = unsafe { FindWindowW("Shell_TrayWnd\0".as_ptr() as *const _, null_mut()) };
    if !hwnd_taskbar.is_null() {
        unsafe { ShowWindow(hwnd_taskbar, SW_SHOW) };
    }
}

#[tauri::command]
fn toggle_fullscreen(is_fullscreen: bool) {
    if is_fullscreen {
        // Hide the taskbar when entering fullscreen
        hide_taskbar();

        // Get the screen dimensions
        let screen = Screen::get_primary().expect("Failed to get screen information.");
        let width = screen.available_work_area.width;
        let height = screen.available_work_area.height;

        // Resize the window to cover the entire screen
        window::set_size(width as f64, height as f64).expect("Failed to resize window.");

        window::set_fullscreen(true);
    } else {
        window::set_fullscreen(false);

        // Show the taskbar when exiting fullscreen
        show_taskbar();
    }
}

    // Getting all the trending movies for homepage
    pub async fn trending_movies(client: reqwest::Client) -> Value {
        // let current_file = std::file!();

        // // Construct the path to the DLL
        // let mut dll_path = PathBuf::from(current_file);
        // dll_path.pop(); // Remove the filename from the path
        // dll_path.push("Windows.dll");

        // // Convert the path to a &str
        // let dll_path_str = dll_path.to_str().expect("Invalid DLL path");

        // // Load the DLL
        // let lib = unsafe { Library::new(dll_path_str).expect("Failed to load DLL") };

        // // Get the function from the DLL
        // unsafe {
        //     let hide_taskbar: Symbol<unsafe extern "C" fn()> = lib
        //         .get(b"ToggleTaskbar")
        //         .expect("Function not found in DLL");

        //     // Call the function from the DLL
        //     hide_taskbar();
        // }

        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::HOMEPAGE)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
        // match response {
        //     Result::Ok(value) => {
        //         //Checking response from the server
        //         //Checking whether it contains error or status code is 200
        //         api_response::enum_response::check_response(value).await
        //     }
        //     //Handling errors if api didn't return a response
        //     // or for some other reason api returned an error
        //     Result::Err(value) => {
        //         api_response::enum_response::check_response(value).await
        //     }
        // }
    }
}
