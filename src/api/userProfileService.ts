import qs from 'query-string';
import axios from 'axios';

export type UserProfileData = {
  id: number;
  dateOfBirth: string;
  sex: string;
  height1: number;
  height1_unit: string;
  height2: number;
  height2_unit: string;
  weight: number;
  weight_unit: string;
  glucose_lower_limit: number;
  glucose_upper_limit: number;
  patient: number;
};

class UserProfileService {
  public async getUserProfileData(props: {patientId: number}) {
    const {patientId} = props;
    const apiUrl = qs.stringifyUrl({
      url: 'http://10.0.2.2:8000/views/setup/',
      query: {
        patient_id: patientId,
      },
    });
    try {
      const response = await axios.get<UserProfileData[]>(apiUrl);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async setUserProfileData() {
    
  }
}

export default UserProfileService;
