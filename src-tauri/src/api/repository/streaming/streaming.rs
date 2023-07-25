pub mod streaming{
    use reqwest::Client;
    // use crate::Value;
    use serde_json::{Value, json};
    pub async fn streaming_url(client: reqwest::Client,id:&str) -> Value {

        // let clients = ClientBuilder::new().dangerous_insecure_ssl(true).build().unwrap();

        let base_urls=vec![
            // "https://vidsrc.me/embed/movie?tmdb=REPLACE",
            "https://www.2embed.cc/embed/REPLACE",
            "https://embed.smashystream.com/playere.php?tmdb=REPLACE",
            "https://autoembed.to/movie/tmdb/REPLACE",
            "https://frembed.com/api/film.php?id=REPLACE",
            "https://multiembed.mov/?video_id=REPLACE&tmdb=1"
        ];

        let mut urls: Vec<String> = Vec::new();

    // Create a custom reqwest::Client with SSL certificate verification disabled
    let mut client_builder = Client::builder();
    client_builder = client_builder.danger_accept_invalid_certs(true);
    let client = client_builder.build().unwrap();

    for url in base_urls {
        let url = url.replace("REPLACE", id);
        let res = client.get(&url).send().await.unwrap();
        if res.status()==200{
            urls.push(url);
        }
        
    }

        match urls.len() {
            0=>{
                json!({
                    "status": "Not Found",
                    "data": "No urls were found",
                })
            },
            _=>{
                json!({
                    "status": "success",
                    "data": urls,
                })
            }
        }

        





        //https://www.themoviedb.org/settings/api
        // let auth_header_value = HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN)).expect("Invalid header value");
        
        // let response:Result<Response,Error> = client.get(endpoints::endpoints::BASEURL.to_string()+id+"/images").header(AUTHORIZATION,auth_header_value).send().await;
        // match response {
        //     Result::Ok(value)=>{

        //         //Checking response from the server
        //         //Checking whether it contains error or status code is 200
        //         api_response::enum_response::check_response(value).await
        //     },
        //     //Handling errors if api didn't return a response
        //     // or for some other reason api returned an error
        //     Result::Err(_)=>{
                
        //     }
        // }
    }
}