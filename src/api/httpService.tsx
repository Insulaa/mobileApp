import {AxiosError, AxiosStatic} from 'axios';
import APIError, {isAPIError, isAxiosError} from './APIError';

class HttpService {
  constructor(protected readonly httpClient: AxiosStatic) {}

  protected apiErrorHandler(error: Error | AxiosError) {
    if (isAxiosError(error)) {
      throw new APIError(
        error.response?.status,
        error.response?.data.detail.Message,
      );
    } else if (isAPIError(error)) {
      throw error;
    } else {
      throw new Error(error.toString());
    }
  }
}

export default HttpService;
