pub mod series {
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::{json, Value};

    pub async fn series_detail(client: reqwest::Client, id: &str) -> Value {
        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::SERIESBASEURL.to_string() + id)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
    }
    pub async fn series_season_detail(client: reqwest::Client, id: &str, season:&str) -> Value {
        //declaring headers for authentication
        //You can also use your own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::SERIESBASEURL.to_string() + id + "/season" +season)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
    }

    //Get images for a particular series
    pub async fn series_images(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/images")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
    }
    pub async fn series_cast(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/credits")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
    }
    pub async fn series_trailer(client: reqwest::Client, id: &str) -> Value {
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::BASEURL.to_string() + id + "/videos")
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        let res=api_response::enum_response::check_response(response).await;
        match res["status"].as_str().unwrap() {
            "success" => {
                //Checking response from the server
                //Checking whether it contains error or status code is 200
                for links in res["data"]["results"].as_array().unwrap() {
                    if links["type"].as_str().unwrap() == "Trailer" {
                        return json!({
                            "status": "success",
                            "data": (String::from("https://www.youtube.com/embed/")+links["key"].as_str().unwrap()).as_str(),
                        });
                    }
                };
                json!({
                    "status": "success",
                    "data": "No trailer found",
                })
                
            },
            //Handling errors if api didn't return a response
            // or for some other reason api returned an error
            "error" => {
                res
            },
            _=>{
                json!({
                    "status": "error",
                    "data": "Some error occurred",
                })
            }
        }
    }
}
