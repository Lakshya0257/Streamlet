pub mod api_client {
    
    struct ApiClient {
        client: reqwest::Client,
    }

    impl ApiClient {
        pub fn new() -> ApiClient {
            ApiClient {
                client: reqwest::Client::new(),
            }
        }

        pub async fn get(&self, url: &str) -> Result<reqwest::Response, reqwest::Error> {
            self.client.get(url).send().await
        }
    }
}