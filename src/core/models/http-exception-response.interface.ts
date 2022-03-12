export interface HttpExceptionResponse {
  successStatus: boolean;
  message: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  timeStamp: Date;
}
