export type ApiResponse<T = any> = {
  data?: T;
  message?: string;
};

export type ApiResponseError = {
  error: string;
  message?: string;
  details?: any;
};
