export interface HttpResponse {
  status: number;
  body: string;
  headers: Record<string, string>;
}
