pub mod homepage {

    //necc crates imports for the module
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::{json, Value};

    // Getting all the trending movies for homepage
    pub async fn trending_movies(client: reqwest::Client) -> Value {
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
