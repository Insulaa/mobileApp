import qs from 'query-string';
import axios from 'axios';

export type UserProfileData = {
  id: number;
  question1: string;
  question2: string;
  question3: string;
  patient_id: number;
  lower_bound: number;
  upper_bound: number;
};

class UserProfileService {
  public async getUserProfileData(props: {patientId: number}) {
    const {patientId} = props;
    const apiUrl = qs.stringifyUrl({
      url: 'http://127.0.0.1:8000/views/setup/',
      query: {
        patient_id: patientId,
      },
    });
    try {
      const response = await axios.get<UserProfileData>(apiUrl);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserProfileService;
