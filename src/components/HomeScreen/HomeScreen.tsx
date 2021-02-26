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

const HomeScreen = () => {
  const [glucoseReadings, setGlucoseReadings] = useState<UserGlucoseReadings>({
    readings: [],
    isLoading: true,
    error: null,
  });
  const [numberOfReadings, setNumberOfReadings] = useState<number>(0);

  console.log('Glucose Readings: ', glucoseReadings);
  if (numberOfReadings > 0) {
    console.log('HIHIHIHI');
    console.log('READINGS: ', glucoseReadings.readings[0]['glucose_reading']);
  }

  useEffect(() => {
    axios
      .get<GlucoseReading[]>('http://10.0.2.2:8000/GlucoseToday/?patient_id=1')
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
            {numberOfReadings >= 3 && (
              <>
                <GlucoseReadingIcon
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
                <GlucoseReadingIcon
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
                <GlucoseReadingIcon
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
              </>
            )}
            {numberOfReadings == 2 && (
              <>
                <GlucoseReadingIcon
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
                <GlucoseReadingIcon
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
              </>
            )}
            {numberOfReadings == 1 && (
              <GlucoseReadingIcon
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
          </>
        )}
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <Text></Text>
        <GlucoseReadingIcon
          glucoseReading={10}
          units="mg/dL"
          time={'11:15 AM'}
        />
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
