import {AxiosError} from 'axios';

class APIError extends Error {
  statusCode: number;
  message: string;
  isAPIError: boolean;

  constructor(
    code: number | undefined,
    message: string | undefined,
    ...params: any
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    this.statusCode = code ?? -1;
    this.message = message ?? 'Details not provided by API.';
    this.isAPIError = true;
  }

  toString() {
    return `Failed with status code: ${this.statusCode}. ${this.message}`;
  }
}

export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function isAPIError(error: any): error is APIError {
  return (error as APIError).isAPIError !== undefined;
}

export default APIError;
