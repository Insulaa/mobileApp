import qs from 'query-string';
import axios from 'axios';

export type MedicationMasterData = {
  medication_id: number;
  medication_name: string;
};

export type UserMedication = {
  patient: number;
  medication: MedicationMasterData;
  image: string;
  dosage: number;
  unit: string;
  frequency: number;
  frequency_period: string;
  currently_taking: boolean;
  start: string;
  end: string | null;
  medication_input_id: number;
  notes: string;
};

class MedicationService {
  public async getMasterMedicationList() {
    const apiUrl = 'http://10.0.2.2:8000/views/MedicationMaster/';

    try {
      const response = await axios.get<MedicationMasterData[]>(apiUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserMedicationsCurrent(props: {patientId: number}) {
    const {patientId} = props;
    const apiUrl = qs.stringifyUrl({
      url: 'http://10.0.2.2:8000/views/getMedicationsCurrent/',
      query: {
        patient_id: patientId,
      },
    });
    try {
      const response = await axios.get<UserMedication[]>(apiUrl);
      if (response.status === 200 || response.status === 204) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async addUserMedication(props: {
    patientId: number;
    medication: number;
    image: string | null;
    dosage: number;
    unit: string;
    frequency: number;
    frequencyPeriod: string;
    isCurrent: boolean;
    startDate: string;
    endDate: string | null;
  }) {
    const {
      patientId,
      medication,
      image,
      dosage,
      unit,
      frequency,
      frequencyPeriod,
      isCurrent,
      startDate,
      endDate,
    } = props;
    const apiUrl = 'http://10.0.2.2:8000/views/medications/';
    const body = {
      patient: patientId,
      medication: medication,
      image: image,
      dosage: dosage,
      unit: unit,
      frequency: frequency,
      frequency_period: frequencyPeriod,
      currently_taking: isCurrent,
      start: startDate,
      end: endDate,
    };
    try {
      console.log(body);
      const response = await axios.post(apiUrl, body);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default MedicationService;
