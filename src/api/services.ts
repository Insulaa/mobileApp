import GlucoseService from './glucoseService';
import MedicationService from './medicationService';
import UserProfileService from './userProfileService';
import UserService from './userService';
import BloodPressureService from './bloodPressureService';
import UserService from './userService';

const createServices = () => ({
  glucoseService: new GlucoseService(),
  medicationService: new MedicationService(),
  userProfileService: new UserProfileService(),
  userService: new UserService(),
  bloodPressureService: new BloodPressureService(),
  userService: new UserService(),
});

export default createServices;
