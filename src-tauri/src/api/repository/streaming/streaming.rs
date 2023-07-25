pub mod streaming {
    use reqwest::Client;
    // use reqwest::ClientBuilder;
    // use crate::Value;
    use serde_json::{json, Value};
    pub async fn streaming_url(client: reqwest::Client, id: &str) -> Value {
        // let clients = ClientBuilder::new().dangerous_insecure_ssl(true).build().unwrap();

        let base_urls = vec![
            // "https://vidsrc.me/embed/movie?tmdb=REPLACE",
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
            let res = client.get(&url).send().await.unwrap();
            if res.status() == 200 {
                urls.push(url);
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
