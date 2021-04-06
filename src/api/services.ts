import GlucoseService from './glucoseService';
import MedicationService from './medicationService';
import UserProfileService from './userProfileService';
import BloodPressureService from './bloodPressureService';

const createServices = () => ({
  glucoseService: new GlucoseService(),
  medicationService: new MedicationService(),
  userProfileService: new UserProfileService(),
  bloodPressureService: new BloodPressureService(),
});

export default createServices;
