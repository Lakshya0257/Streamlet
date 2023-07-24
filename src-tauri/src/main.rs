// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//imports
use api::repository;
use reqwest::Client;
use serde_json::{json, Value};

fn main() {

  // main start of application
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[tauri::command]
// #[warn(non_snake_case)]
//https://tauri.app/v1/guides/features/command/
async fn get_data(apiType: String , id:Option<String>) -> Result<Value, ()> {

    //client for api callings
    let client: Client = reqwest::Client::new();
    match apiType.as_str() {
        "homepage" => {
            println!("Getting Homepage...");
            let value: Value = repository::homepage::homepage::trending_movies(client).await;
            // println!("Tranferring the data to the application...");
            Result::Ok(value)
            // print!("Getting");
        },
        "top_rated"=>{
            println!("Getting Top Rated Movies...");
            let value: Value = repository::movies_list::movies_list::top_rated(client).await;
            Result::Ok(value)
        },
        "get_movie"=>{
            println!("Getting Movie Details...");
            let value: Value = repository::movies::movies::movie_detail(client, &id.unwrap_or(String::from(""))).await;
            Result::Ok(value)
        },
        "movie_images"=>{
            println!("Getting Movie Images...");
            let value: Value = repository::movies::movies::movie_images(client, &id.unwrap_or(String::from(""))).await;
            Result::Ok(value)
        },
        "movie_cast"=>{
            println!("Getting Movie casts...");
            let value: Value = repository::movies::movies::movie_cast(client, &id.unwrap_or(String::from(""))).await;
            Result::Ok(value)
        },
        "streaming_url"=>{
            println!("Getting Movie url...");
            let value: Value = repository::streaming::streaming::streaming::streaming_url(client, &id.unwrap_or(String::from(""))).await;
            Result::Ok(value)
        },

        //Getting invalid request from front-end side
        _ => Result::Ok(json!({
            "status": "error",
            "data": "Invalid api type",
        })),
    }
}

// ------------------------------Module imports--------------------------------

//imports
//crates intialization
// all modules should be initialized here
mod api {
    // pub mod api_initialize;

    // Repository for api callings
    // All api callings will be called from here
    pub mod repository {

      //all apis
        pub mod homepage;
        pub mod movies_list;
        pub mod movies;
        
        pub mod streaming{
            pub mod streaming;
        }
    }

    // Constant modules for api-calling etc
    pub mod constants {
        pub mod endpoints;
    }

    // Error handling module for api callings
    pub mod error_handling {
        pub mod error;
    }

    pub mod helper {
        pub mod api_response;
    }
}
