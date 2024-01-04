pub mod series_list{
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Response, Error};
    use serde_json::{Value, json};
    use crate::api::helper::api_response;
    use crate::api::constants::endpoints;
    //Top Rated movies
    pub async fn top_rated(client: reqwest::Client, page: String) -> Value { 
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let endpoint = format!("{}?page={}", endpoints::endpoints::SERIESTOPRATED, page);
        let auth_header_value = HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN)).expect("Invalid header value");
        
        let response:Result<Response,Error> = client.get(&endpoint).header(AUTHORIZATION,auth_header_value).send().await;
        api_response::enum_response::check_response(response).await
    }
    pub async fn popular(client: reqwest::Client, page: String) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let endpoint = format!("{}?page={}", endpoints::endpoints::SERIESPOPULAR, page);
        let auth_header_value = HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN)).expect("Invalid header value");
        
        let response:Result<Response,Error> = client.get(&endpoint).header(AUTHORIZATION,auth_header_value).send().await;
        api_response::enum_response::check_response(response).await
}
}