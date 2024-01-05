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
async fn get_data(api_type: String, id: Option<String>,page: Option<String>,season: Option<String>, episode: Option<String>) -> Result<Value, ()> {
    //client for api callings
    let client: Client = reqwest::Client::new();
    match api_type.as_str() {
        "homepage" => {
            println!("Getting Homepage...");
            let value: Value = repository::homepage::homepage::trending_movies(client).await;
            // println!("Tranferring the data to the application...");
            Result::Ok(value)
            // print!("Getting");
        }
        "top_rated" => {
            println!("Getting Top Rated Movies...");
            match page{
                Some(page) =>{
                    let value: Value = repository::movies_list::movies_list::top_rated(client,page).await;
                    Result::Ok(value)
                }
                None=>{
                    let value: Value = repository::movies_list::movies_list::top_rated(client,String::from("1")).await;
                    Result::Ok(value)
                }
            }
        }
        "get_movie" => {
            println!("Getting Movie Details...");
            let value: Value =
                repository::movies::movies::movie_detail(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "movie_images" => {
            println!("Getting Movie Images...");
            let value: Value =
                repository::movies::movies::movie_images(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "movie_cast" => {
            println!("Getting Movie casts...");
            let value: Value =
                repository::movies::movies::movie_cast(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "streaming_url" => {
            println!("Getting Movie url...");
            let value: Value = repository::streaming::streaming::streaming::streaming_url(
                client,
                &id.unwrap_or(String::from("")),
            )
            .await;
            Result::Ok(value)
        }
        "movie_trailer" => {
            println!("Getting Movie trailer...");
            let value: Value =
                repository::movies::movies::movie_trailer(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "search_movie" => {
            println!("Searching Movie...");
            let value: Value =
                repository::search::search::search_movie(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "popular" => {
            println!("Getting popular movies...");
            
            match page{
                Some(page) =>{
                    let value: Value =
            repository::movies_list::movies_list::popular(client,page)
                    .await;
            Result::Ok(value)
                }
                None=>{
                    let value: Value = repository::movies_list::movies_list::popular(client,String::from("1")).await;
                    Result::Ok(value)
                }
            }
        }








        // Series apis
        "series/homepage" => {
            println!("Getting Series Homepage...");
            let value: Value = repository::series::homepage::homepage::trending_series(client).await;
            // println!("Tranferring the data to the application...");
            Result::Ok(value)
        }
        "series/top_rated" => {
            println!("Getting Top Rated series...");
            match page{
                Some(page) =>{
                    let value: Value = repository::series::series_list::series_list::top_rated(client,page).await;
                    Result::Ok(value)
                }
                None=>{
                    let value: Value = repository::series::series_list::series_list::top_rated(client,String::from("1")).await;
                    Result::Ok(value)
                }
            }
        }
        "get_series" => {
            println!("Getting Series Details...");
            let value: Value =
                repository::series::series_info::series::series_detail(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "series/popular" => {
            println!("Getting popular series...");
            
            match page{
                Some(page) =>{
                    let value: Value =
            repository::series::series_list::series_list::popular(client,page)
                    .await;
            Result::Ok(value)
                }
                None=>{
                    let value: Value = repository::series::series_list::series_list::popular(client,String::from("1")).await;
                    Result::Ok(value)
                }
            }
        }
        "series/season" => {
            println!("Getting season info...");
            
            match season{
                Some(sea) =>{
                    let value: Value =
            repository::series::series_info::series::series_season_detail(client,&id.unwrap_or(String::from("")),&sea)
                    .await;
            Result::Ok(value)
                }
                None=>{
                    let value: Value = repository::series::series_info::series::series_season_detail(client,&id.unwrap_or(String::from("")),"1").await;
                    Result::Ok(value)
                }
            }
        }
        "series_cast" => {
            println!("Getting Movie casts...");
            let value: Value =
                repository::series::series_info::series::series_cast(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }
        "series_streaming_url" => {
            println!("Getting Series url...");
            let value: Value = repository::streaming::streaming::streaming::series_streaming_url(
                client,
                &id.unwrap_or(String::from("")),
                &season.unwrap_or(String::from("1")),
                &episode.unwrap_or(String::from("1"))
            )
            .await;
            Result::Ok(value)
        }
        "series_trailer" => {
            println!("Getting Movie trailer...");
            let value: Value =
                repository::series::series_info::series::series_trailer(client, &id.unwrap_or(String::from("")))
                    .await;
            Result::Ok(value)
        }

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
        pub mod movies;
        pub mod movies_list;
        pub mod search;

        pub mod streaming {
            pub mod streaming;
        }

        pub mod series {
            pub mod homepage;
            pub mod series_list;
            pub mod series_info;
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
