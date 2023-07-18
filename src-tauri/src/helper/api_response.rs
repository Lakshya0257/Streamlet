enum ApiResponse {
    Ok(String),
    Error(String)
}

pub mod api_response{
    pub fn check_response(&self) -> Result<String, ApiResponse>{
        if(self.status().is_success()){
            return ApiResponse::Ok(self.text().unwrap());
        }
    }
}