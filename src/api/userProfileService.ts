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

  public async setUserProfileData(props: {
    patient_id: string;
    date_of_birth: string;
    sex: string;
    height1: number;
    height1_unit: string;
    height2: number;
    height2_unit: string;
    weight: number;
    weight_unit: string;
    glucose_lower_limit: number;
    glucose_upper_limit: number;
  }) {
    const {patient_id, date_of_birth, sex, height1, height1_unit, height2, height2_unit, weight, weight_unit, glucose_lower_limit, glucose_upper_limit} = props;
    const apiUrl = 'http://10.0.2.2:8000/views/setup';
    const body = {
      patient: patient_id,
      dateOfBirth: date_of_birth,
      sex: sex,
      height1: height1,
      height1_unit: height1_unit,
      height2: height2,
      height2_unit: height2_unit,
      weight: weight,
      weight_unit: weight_unit,
      glucose_lower_limit: glucose_lower_limit,
      glucose_upper_limit: glucose_upper_limit
    };
    try {
      const response = await axios.post(apiUrl, body);
      if (response.status === 201) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserProfileService;
