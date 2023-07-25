pub mod search {
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::Value;

    pub async fn search_movie(client: reqwest::Client, query: &str) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let endpoint = format!("{}?query={}", endpoints::endpoints::SEARCHMOVIE, query); // Append the query parameter to the endpoint URL

        let response: Result<Response, Error> = client
            .get(&endpoint)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
    }
}
