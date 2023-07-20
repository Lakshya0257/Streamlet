pub mod enum_response {
    use crate::api::error_handling::error::errors_declaration;
    use reqwest::{Response, StatusCode};
    use serde_json::{json, Value};

    pub async fn check_response(data: Response) -> Value {
        match data.status() {
            StatusCode::OK => {
                let api_data: serde_json::Value =
                    serde_json::from_str(&data.text().await.unwrap()).unwrap();
                json!({
                    "status": "success",
                    "data": api_data,
                })
            }
            _ => {
                json!({
                    "status": "error",
                    "data": errors_declaration::check_error(data),
                })
            }
        }
    }
}
