import qs from 'query-string';
import axios from 'axios';

export type BloodPressureReading = {
  id: number;
  date: string;
  systolic: number;
  diastolic: number;
  timestamp: string;
  patient: number;
};

class BloodPressureService {
  public async getBloodPressureReadings(props: {patientId: number}) {
    const {patientId} = props;
    const apiUrl = qs.stringifyUrl({
      url: 'http://10.0.2.2:8000/views/BloodPressure/',
      query: {
        patient_id: patientId,
      },
    });
    try {
      const response = await axios.get<BloodPressureReading[]>(apiUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async addBloodPressureReading(props: {
    patientId: number;
    systolic: number;
    diastolic: number;
  }) {
    const {patientId, systolic, diastolic} = props;
    const apiUrl = 'http://10.0.2.2:8000/views/BloodPressure/';
    const body = {
      systolic: systolic,
      diastolic: diastolic,
      patient: patientId,
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
}

export default BloodPressureService;
