pub mod homepage {
    //necc crates imports for the module
    use crate::api::constants::endpoints;
    use crate::api::helper::api_response;
    use libloading::{Library, Symbol};
    use reqwest::header::{HeaderValue, AUTHORIZATION};
    use reqwest::{Error, Response};
    use serde_json::{json, Value};
    use std::path::PathBuf;

    // Getting all the trending movies for homepage
    pub async fn trending_movies(client: reqwest::Client) -> Value {
        // let current_file: &str = std::file!();

        // // Construct the path to the DLL
        // let mut dll_path = PathBuf::from(current_file);
        // dll_path.pop(); // Remove the filename from the path
        // dll_path.push("Windows.dll");

        // // Convert the path to a &str
        // let dll_path_str = dll_path.to_str().expect("Invalid DLL path");

        // // Load the DLL
        // let lib = unsafe { Library::new(dll_path_str).expect("Failed to load DLL") };

        // // Get the function from the DLL
        // unsafe {
        //     let hide_taskbar: Symbol<unsafe extern "C" fn()> = lib
        //         .get(b"ShutdownSystem")
        //         .expect("Function not found in DLL");

        //     // Call the function from the DLL
        //     hide_taskbar();
        // }

        //declaring headers for authentication
        //You can also use yout own token by
        //https://www.themoviedb.org/settings/api
        let auth_header_value =
            HeaderValue::from_str(&format!("Bearer {}", endpoints::creds::TOKEN))
                .expect("Invalid header value");

        let response: Result<Response, Error> = client
            .get(endpoints::endpoints::HOMEPAGE)
            .header(AUTHORIZATION, auth_header_value)
            .send()
            .await;
        api_response::enum_response::check_response(response).await
        // match response {
        //     Result::Ok(value) => {
        //         //Checking response from the server
        //         //Checking whether it contains error or status code is 200
        //         api_response::enum_response::check_response(value).await
        //     }
        //     //Handling errors if api didn't return a response
        //     // or for some other reason api returned an error
        //     Result::Err(value) => {
        //         api_response::enum_response::check_response(value).await
        //     }
        // }
    }
}
