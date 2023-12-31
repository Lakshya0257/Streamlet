
//Error handler for api, what kind of error api have trown up
pub mod errors_declaration{

    //Status code 
    use reqwest::{StatusCode,Error};

    //checking errors
    pub fn check_error(data:Error) ->String{
        
        match data.status().unwrap_or(StatusCode::BAD_REQUEST){
            StatusCode::UNAUTHORIZED=>{
                String::from("Unauthorized")
            },
            StatusCode::REQUEST_TIMEOUT=>{
                String::from("Request Timeout")
            },
            StatusCode::BAD_GATEWAY=>{
                String::from("Bad Gateway")
            },
            StatusCode::SERVICE_UNAVAILABLE=>{
                String::from("Service Unavailable")
            },
            StatusCode::GATEWAY_TIMEOUT=>{
                String::from("Gateway Timeout")
            },
            _=>{
                String::from("Unknown Error")
            }
        }
    }

    
}