import qs from 'query-string';
import axios from 'axios';

export type GlucoseReading = {
  date: string;
  glucose_reading: number;
  id: number;
  patient_id: number;
  timestamp: string;
};

class GlucoseService {
  public async getGlucoseReadings(props: {patientId: number}) {
    const {patientId} = props;
    const apiUrl = qs.stringifyUrl({
      url: 'http://10.0.2.2:8000/GlucoseToday/',
      query: {
        patient_id: patientId,
      },
    });
    try {
      const response = await axios.get<GlucoseReading[]>(apiUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async addGlucoseReading(props: {
    patientId: number;
    glucoseLevel: number;
  }) {
    const {patientId, glucoseLevel} = props;
    const apiUrl = 'http://10.0.2.2:8000/views/glucoseLevels/';
    const body = {
      glucose_reading: glucoseLevel,
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
  public async updateGlucoseReading(props: {
    patientId: number;
    glucoseLevel: number;
    readingId: number;
  }) {
    const {patientId, glucoseLevel, readingId} = props;
    const apiUrl = `http://10.0.2.2:8000/views/glucoseLevels/${readingId}/`;
    const body = {
      glucose_reading: glucoseLevel,
      patient: patientId,
    };
    try {
      const response = await axios.put(apiUrl, body);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default GlucoseService;
