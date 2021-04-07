import qs from 'query-string';
import axios from 'axios';

export type UserInfo = {
  patient_id: number;
  password: string;
  last_login: string;
  is_superuser: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_joined: string;
  groups: [];
  user_permissions: [];
  completed_setup: boolean;
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

  public async loginUser(props: {email: string; password: string}) {
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

  public async setCompletedSetupTrue(props: {patient_id: number}) {
    const {patient_id} = props;
    const apiUrl = `http://10.0.2.2:8000/views/patients/${patient_id}/`;
    const body = {
      completed_setup: true
    };
    try {
      const response = await axios.patch(apiUrl, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
