export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface HttpRequest {
  url: string;
  method: HttpMethod;
  body?: string;
  headers?: Record<string, string>;
}

export interface HttpResponse {
  status: number;
  body?: string;
  headers?: Record<string, string>;
  millis: number;
}
