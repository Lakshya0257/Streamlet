pub mod homepage {
    use reqwest::{Response, Error};
    use serde_json::{Value, json};
    use crate::api::helper::api_response;
    use crate::api::constants::endpoints::endpoints;

    pub async fn trending_movies(client: reqwest::Client) -> Value {
        let response:Result<Response,Error> = client.get(endpoints::HOMEPAGE).send().await;
        match response {
            Result::Ok(value)=>{
                api_response::enum_response::check_response(value).await
            },
            Result::Err(_)=>{
                json!({
                    "status": "error",
                    "data": "Error thown by application",
                })
            }
        }
    }
}