import qs from "query-string";
import axios from 'axios';

export type MedicationMasterData = {
    medication_id: number;
    medication_name: string;
    medication_unit: string;
}

class MedicationService {
    public async getMasterMedicationList() {
        const apiUrl = "http://10.0.2.2:8000/views/MedicationMaster/"

        try {
            const response = await axios.get<MedicationMasterData[]>(apiUrl);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default MedicationService;