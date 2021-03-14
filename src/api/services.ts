import GlucoseService from './glucoseService';
import MedicationService from './medicationService'

const createServices = () => ({
    glucoseService: new GlucoseService(),
    medicationService: new MedicationService(),
});

export default createServices;