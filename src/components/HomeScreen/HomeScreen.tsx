import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  StyleSheet,
} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {UserGlucoseReadings, GlucoseReading} from '../../api/interfaces';
import {render} from 'react-dom';
import {max} from 'moment';

const HomeScreen = () => {
  const [glucoseReadings, setGlucoseReadings] = useState<UserGlucoseReadings>({
    readings: [],
    isLoading: true,
    error: null,
  });
  const [numberOfReadings, setNumberOfReadings] = useState<number>(0);

  const getUserGlucoseLevels = () => {
    axios
      .get<GlucoseReading[]>('http://10.0.2.2:8000/GlucoseToday/?patient_id=2')
      .then((response: AxiosResponse) => {
        setGlucoseReadings({
          readings: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        setGlucoseReadings({
          readings: [],
          isLoading: false,
          error: err,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    getUserGlucoseLevels();
  }, [numberOfReadings]);

  useEffect(() => {
    if (glucoseReadings.readings.length > 0) {
      setNumberOfReadings(glucoseReadings.readings.length);
    }
  }, [glucoseReadings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        {!glucoseReadings.isLoading && (
          <>
            {numberOfReadings > 2 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings.readings[numberOfReadings - 3][
                    'glucose_reading'
                  ]
                }
                units="mg/dL"
                time={
                  glucoseReadings.readings[numberOfReadings - 3]['timestamp']
                }
              />
            )}
            {numberOfReadings > 1 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings.readings[numberOfReadings - 2][
                    'glucose_reading'
                  ]
                }
                units="mg/dL"
                time={
                  glucoseReadings.readings[numberOfReadings - 2]['timestamp']
                }
              />
            )}
            {numberOfReadings > 0 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings.readings[numberOfReadings - 1][
                    'glucose_reading'
                  ]
                }
                units="mg/dL"
                time={
                  glucoseReadings.readings[numberOfReadings - 1]['timestamp']
                }
              />
            )}
            {numberOfReadings < 3 && <GlucoseReadingIcon isEmpty={true} />}
          </>
        )}
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <Text></Text>
        <GlucoseReadingIcon isEmpty={false} glucoseReading={10} units="mg/dL" />
      </View>
      <View style={styles.buttonsContainer}>
        <GlucoseScreenButton buttonText="ADD READING" />
        <GlucoseScreenButton buttonText="EXPORT DATA" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default HomeScreen;
