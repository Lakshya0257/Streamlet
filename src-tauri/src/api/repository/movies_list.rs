pub mod movies_list{
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Response, Error};
    use serde_json::{Value, json};
    use crate::api::helper::api_response;
    use crate::api::constants::endpoints;
    //Top Rated movies
    pub async fn top_rated(client: reqwest::Client) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value = HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN)).expect("Invalid header value");
        
        let response:Result<Response,Error> = client.get(endpoints::endpoints::TOPRATED).header(AUTHORIZATION,auth_header_value).send().await;
        api_response::enum_response::check_response(response).await
        // match response {
        //     Result::Ok(value)=>{

        //         //Checking response from the server
        //         //Checking whether it contains error or status code is 200
        //         api_response::enum_response::check_response(value).await
        //     },
        //     //Handling errors if api didn't return a response
        //     // or for some other reason api returned an error
        //     Result::Err(_)=>{
        //         api_response::enum_response::check_response(value).await
        //     }
        // }
    }
    pub async fn popular(client: reqwest::Client) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value = HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN)).expect("Invalid header value");
        
        let response:Result<Response,Error> = client.get(endpoints::endpoints::POPULAR).header(AUTHORIZATION,auth_header_value).send().await;
        api_response::enum_response::check_response(response).await
}
}