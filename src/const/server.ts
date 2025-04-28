export interface ServerMetaResponse {
    http_code: string;
  }
  
  export interface ServerErrorField {
    field: string;
    message: string;
  }
  
  export interface ServerErrorResponse<
    T = ServerErrorField[],
    K = ServerMetaResponse,
  > {
    errors: T;
    meta: K;
  }
  
  export interface ServerResponse<T, K = ServerMetaResponse> {
    data: T;
    meta: K;
  }