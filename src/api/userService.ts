import qs from 'query-string';
import axios from 'axios';

export type UserInfo = {
  patient_id: number;
  password: string;
  last_login: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_joined: string;
};

export type User = {
  user: UserInfo;
  token: string;
};

class UserService {
  public async registerUser(props: {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone_number: string;
  }) {
    const {first_name, last_name, password, email, phone_number} = props;
    const apiUrl = 'http://10.0.2.2:8000/auth/register/';
    const body = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email,
      phone_number: phone_number,
    };
    try {
      const response = await axios.post(apiUrl, body);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

    public async loginUser(props: {
        email: string;
        password: string;
    })
    {
        const {email, password} = props;
        const apiUrl = 'http://10.0.2.2:8000/auth/login/';
        const body = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(apiUrl, body);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
  }
}

export default UserService;
