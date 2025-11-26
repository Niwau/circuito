use std::collections::HashMap;
use tauri::{Manager, State};

struct AppState {
    http_client: reqwest::Client,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            http_client: reqwest::Client::new(),
        }
    }
}

#[derive(serde::Deserialize)]
pub enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH,
}

#[derive(serde::Deserialize)]
struct HttpRequest {
    url: String,
    method: HttpMethod,
    headers: Option<HashMap<String, String>>,
    body: Option<String>,
}

#[derive(serde::Serialize)]
struct HttpResponse {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

#[tauri::command]
async fn http_request(
    state: State<'_, AppState>,
    request: HttpRequest,
) -> Result<HttpResponse, HttpResponse> {
    let client = &state.http_client;

    let mut req_builder = match request.method {
        HttpMethod::GET => client.get(&request.url),
        HttpMethod::POST => client.post(&request.url),
        HttpMethod::PUT => client.put(&request.url),
        HttpMethod::DELETE => client.delete(&request.url),
        HttpMethod::PATCH => client.patch(&request.url),
    };

    if let Some(headers) = request.headers {
        for (key, value) in headers {
            req_builder = req_builder.header(&key, &value);
        }
    }

    if let Some(body) = request.body {
        req_builder = req_builder.json(&body);
    }

    let response = req_builder.send().await;

    match response {
        Ok(resp) => {
            let status = resp.status();

            let mut headers_map = HashMap::new();
            for (key, value) in resp.headers().iter() {
                headers_map.insert(key.to_string(), value.to_str().unwrap_or("").to_string());
            }
            let body = resp.text().await.unwrap_or_default();

            if !status.is_success() {
                return Err(HttpResponse {
                    status: status.as_u16(),
                    headers: headers_map,
                    body: body.clone(),
                });
            }

            Ok(HttpResponse {
                status: status.as_u16(),
                headers: headers_map,
                body,
            })
        }
        Err(err) => Err(HttpResponse {
            status: 500,
            headers: HashMap::new(),
            body: format!("Critical error: {}", err),
        }),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(AppState::default());
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![http_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
