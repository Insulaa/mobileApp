import qs from 'query-string';
import {BaseAPIUrl} from './utils-api';
import HttpService from './httpService';
import APIError from './APIError';

export type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

class UserService extends HttpService {
  public async getUser(props: {userId: number}) {
    const userId = props;
    const apiUrl = qs.stringifyUrl({
      url: BaseAPIUrl + '/view/patients',
      query: {
        userId: String(userId),
      },
    });

    try {
      const response = await this.httpClient.get<User>(apiUrl);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new APIError(response.status, 'API response unknown.');
      }
    } catch (err) {
      this.apiErrorHandler(err);
    }
  }
}
export default UserService;
