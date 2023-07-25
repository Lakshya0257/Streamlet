pub mod movies {
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::{json, Value};
    //Top Rated movies
    pub async fn movie_detail(client: reqwest::Client, id: &str) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        match response {
            Result::Ok(value) => {
                //Checking response from the server
                //Checking whether it contains error or status code is 200
                api_response::enum_response::check_response(value).await
            }
            //Handling errors if api didn't return a response
            // or for some other reason api returned an error
            Result::Err(_) => {
                json!({
                    "status": "error",
                    "data": "Error thown by application",
                })
            }
        }
    }

    //Get images for a particular movie
    pub async fn movie_images(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/images")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        match response {
            Result::Ok(value) => {
                //Checking response from the server
                //Checking whether it contains error or status code is 200
                api_response::enum_response::check_response(value).await
            }
            //Handling errors if api didn't return a response
            // or for some other reason api returned an error
            Result::Err(_) => {
                json!({
                    "status": "error",
                    "data": "Error thown by application",
                })
            }
        }
    }
    pub async fn movie_cast(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/credits")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        match response {
            Result::Ok(value) => {
                //Checking response from the server
                //Checking whether it contains error or status code is 200
                api_response::enum_response::check_response(value).await
            }
            //Handling errors if api didn't return a response
            // or for some other reason api returned an error
            Result::Err(_) => {
                json!({
                    "status": "error",
                    "data": "Error thown by application",
                })
            }
        }
    }
    pub async fn movie_trailer(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/videos")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        match response {
            Result::Ok(value) => {
                //Checking response from the server
                //Checking whether it contains error or status code is 200
                let output = api_response::enum_response::check_response(value).await;
                if output["status"].as_str().unwrap() == "success" {
                    for links in output["data"]["results"].as_array().unwrap() {
                        if links["type"].as_str().unwrap() == "Trailer" {
                            return json!({
                                "status": "success",
                                "data": (String::from("https://www.youtube.com/embed/")+links["key"].as_str().unwrap()).as_str(),
                            });
                        }
                    };
                    
                return json!({
                    "status": "error",
                    "data": "Not Found",
                })
                }
                output
            }
            //Handling errors if api didn't return a response
            // or for some other reason api returned an error
            Result::Err(_) => {
                json!({
                    "status": "error",
                    "data": "Error thown by application",
                })
            }
        }
    }
}
