pub mod enum_response {
    use crate::api::error_handling::error::errors_declaration;
    use reqwest::{Response, StatusCode};
    use serde_json::{json, Value};

    // Checking the response status
    pub async fn check_response(data: Response) -> Value {

        // Check the response
        match data.status() {

            //If the response was successful
            StatusCode::OK => {

                //Parse the response to json and return with success status
                let api_data: serde_json::Value =
                    serde_json::from_str(&data.text().await.unwrap()).unwrap();
                json!({
                    "status": "success",
                    "data": api_data,
                })
            }

                        //If the response was not successful
            _ => {
                json!({
                    "status": "error",
                    //Checking the kind of error returned
                    "data": errors_declaration::check_error(data),
                })
            }
        }
    }
}
