pub mod enum_response {
    use crate::api::error_handling::error::errors_declaration;
    use reqwest::{Response, StatusCode, Error};
    use serde_json::{json, Value};

    // Checking the response status
    pub async fn check_response(data: Result<Response, Error>) -> Value {

        // Check the response
        match data {
            Ok(response) => {
                match response.status(){
                    StatusCode::OK => {

                        //Parse the response to json and return with success status
                        let api_data: serde_json::Value =
                            serde_json::from_str(&response.text().await.unwrap()).unwrap();
                        json!({
                            "status": "success",
                            "data": api_data,
                        })
                    },
                    _=>{
                        json!({
                            "status": "error",
                            "data":"Internal Error! Contact admin"
                        })
                    }
                }
            },
            Err(err)=>{
                json!({
                    "status": "error",
                    //Checking the kind of error returned
                    "data": errors_declaration::check_error(err),
                })
            }
        }
    }
}
