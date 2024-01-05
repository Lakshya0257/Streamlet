pub mod streaming {
    use reqwest::{Client, Response};
    // use reqwest::ClientBuilder;
    // use crate::Value;
    use serde_json::{json, Value};
    pub async fn streaming_url(client: reqwest::Client, id: &str) -> Value {
        // let clients = ClientBuilder::new().dangerous_insecure_ssl(true).build().unwrap();

        let base_urls = vec![
            "https://vidsrc.me/embed/movie?tmdb=REPLACE",
            "https://www.2embed.cc/embed/REPLACE",
            "https://embed.smashystream.com/playere.php?tmdb=REPLACE",
            "https://autoembed.to/movie/tmdb/REPLACE",
            "https://frembed.com/api/film.php?id=REPLACE",
            "https://multiembed.mov/?video_id=REPLACE&tmdb=1",
        ];

        let mut urls: Vec<String> = Vec::new();

        // Create a custom reqwest::Client with SSL certificate verification disabled
        let mut client_builder = Client::builder();
        client_builder = client_builder.danger_accept_invalid_certs(true);
        let client = client_builder.build().unwrap();

        for url in base_urls {
            let url = url.replace("REPLACE", id);
            let res = client.get(&url).send().await;
            match res {
                Result::Ok(val)=>{
                    if val.status() == 200 {
                        urls.push(url);
                    }
                }
                _=>{
                    println!("Error getting url: {:?}", res);
                }
            }
            
        }

        match urls.len() {
            0 => {
                json!({
                    "status": "Not Found",
                    "data": "No urls were found",
                })
            }
            _ => {
                json!({
                    "status": "success",
                    "data": urls,
                })
            }
        }
    }
    pub async fn series_streaming_url(client: reqwest::Client, id: &str, season: &str, episode:&str) -> Value {
        println!("{}, {}", season,episode);
        // let clients = ClientBuilder::new().dangerous_insecure_ssl(true).build().unwrap();

        let base_urls = vec![
            "https://vidsrc.xyz/embed/tv?tmdb=REPLACE&season=SEASONNUMBER&episode=EPISODENUMBER",
            "https://www.2embed.cc/embedtv/REPLACE&s=SEASONNUMBER&e=EPISODENUMBER",
            "https://embed.smashystream.com/playere.php?tmdb=REPLACE&season=SEASONNUMBER&episode=EPISODENUMBER",
            // "https://autoembed.to/movie/tmdb/REPLACE",
            "https://frembed.com/api/serie.php?id=REPLACE&sa=SEASONNUMBER&epi=EPISODENUMBER",
            "https://multiembed.mov/?video_id=REPLACE&tmdb=1&s=SEASONNUMBER&e=EPISODENUMBER",
        ];

        let mut urls: Vec<String> = Vec::new();

        // Create a custom reqwest::Client with SSL certificate verification disabled
        let mut client_builder = Client::builder();
        client_builder = client_builder.danger_accept_invalid_certs(true);
        let client = client_builder.build().unwrap();

        for url in base_urls {
            let url = url.replace("REPLACE", id).replace("SEASONNUMBER", season).replace("EPISODENUMBER", episode);
            let res = client.get(&url).send().await;
            match res {
                Result::Ok(val) => {
                    if val.status() == 200 {
                        urls.push(url);
                    }
                }
                _ => {
                    println!("Error getting url: {:?}", res);
                }
            }
            
        }

        match urls.len() {
            0 => {
                json!({
                    "status": "Not Found",
                    "data": "No urls were found",
                })
            }
            _ => {
                json!({
                    "status": "success",
                    "data": urls,
                })
            }
        }
    }
}
