import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import BloodPressureReadingIcon from '../BloodPressureReadingIcon/BloodPressureReadingIcon';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {actions as bloodPressureActions} from '../../redux/bloodPressureStore';
import ServicesContext from '../../servicesContext';
import {useNavigation} from '@react-navigation/native';
import {BloodPressureReading} from '../../api/bloodPressureService';

const BloodPressureScreen = () => {
  const dispatch = useDispatch();
  const {bloodPressureService} = useContext(ServicesContext);
  const navigation = useNavigation();

  const {
    readings,
    isLoading: isBloodPressureLoading,
    error: bloodPressureError,
  } = useSelector((state: RootState) => state.bloodPressureStore);

  const patientId = 2;

  useEffect(() => {
    dispatch(
      bloodPressureActions.doFetchBloodPressureReadingsAsync({
        patientId,
        bloodPressureService,
      }),
    );
  }, []);

  const handleAddReadingButtonPress = () => {
    navigation.navigate('BloodPressureInput');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Pressure Readings</Text>
      <Text style={styles.body}>Recent Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        {!isBloodPressureLoading && bloodPressureError === null && (
          <>
            {readings.length > 2 && (
              <BloodPressureReadingIcon
                isEmpty={false}
                systolicReading={readings[readings.length - 3]['systolic']}
                diastolicReading={readings[readings.length - 3]['diastolic']}
                date={readings[readings.length - 3]['date']}
              />
            )}
            {readings.length > 1 && (
              <BloodPressureReadingIcon
                isEmpty={false}
                systolicReading={readings[readings.length - 2]['systolic']}
                diastolicReading={readings[readings.length - 2]['diastolic']}
                date={readings[readings.length - 2]['date']}
              />
            )}
            {readings.length > 0 && (
              <BloodPressureReadingIcon
                isEmpty={false}
                systolicReading={readings[readings.length - 1]['systolic']}
                diastolicReading={readings[readings.length - 1]['diastolic']}
                date={readings[readings.length - 1]['date']}
              />
            )}
          </>
        )}
      </View>
      <View style={styles.glucoseReadingsContainer}>
        <BloodPressureReadingIcon
          isEmpty={true}
          onPress={() => handleAddReadingButtonPress()}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <GlucoseScreenButton
          buttonText="ADD READING"
          onPress={() => handleAddReadingButtonPress()}
        />
        <GlucoseScreenButton buttonText="EXPORT DATA" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default BloodPressureScreen;
