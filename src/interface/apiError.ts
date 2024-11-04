export interface ApiError {
  severity: string;
  statusCode: number;
  message: string;
  data?: object;
}
