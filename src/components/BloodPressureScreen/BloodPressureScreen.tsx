import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
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
    readings: bloodPressureReadings,
    isLoading: isBloodPressureLoading,
    error: bloodPressureError,
  } = useSelector((state: RootState) => state.bloodPressureStore);

  const patientId = 1;
  const [readings, setReadings] = useState<BloodPressureReading[]>([
    {
      id: 1,
      date: '2020-04-05',
      systolic: 123,
      diastolic: 71,
      timestamp: '20:01:32.521888',
      patient: 1,
    },
    {
      id: 2,
      date: '2020-04-06',
      systolic: 98,
      diastolic: 63,
      timestamp: '12:20:32.521888',
      patient: 1,
    },
  ]);

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
      <Text style={styles.body}>Last 3 Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        {!isBloodPressureLoading && bloodPressureError === null && (
          <>
            {readings.length > 2 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  readings[readings.length - 3]['glucose_reading']
                }
                units="mg/dL"
                time={readings[readings.length - 3]['timestamp']}
                onPress={() =>
                  handleIconButtonPress({
                    isEdit: true,
                    glucoseReadingId: readings[readings.length - 3]['id'],
                  })
                }
              />
            )}
            {readings.length > 1 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  readings[readings.length - 2]['glucose_reading']
                }
                units="mg/dL"
                time={readings[readings.length - 2]['timestamp']}
              />
            )}
            {readings.length > 0 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  readings[readings.length - 1]['glucose_reading']
                }
                units="mg/dL"
                time={readings[readings.length - 1]['timestamp']}
              />
            )}
          </>
        )}
      </View>
      <Text style={styles.body}>Add</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon
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
