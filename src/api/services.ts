import GlucoseService from './glucoseService';
import MedicationService from './medicationService';
import UserProfileService from './userProfileService';

const createServices = () => ({
  glucoseService: new GlucoseService(),
  medicationService: new MedicationService(),
  UserProfileService: new UserProfileService(),
});

export default createServices;
