// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

//imports
//crates intialization
// all modules should be initialized here
mod api{
  // pub mod api_initialize;

  pub mod repository{
    pub mod homepage;
  }

  pub mod constants{
    pub mod endpoints;
  }

  pub mod error_handling{
    pub mod error;
  }

  pub mod helper{
    pub mod api_response;
  }
}

