import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
import {
  UserGlucoseReadings,
  GlucoseReading,
  GlucoseLevelOnly,
  AllGlucoseLevelsOnly,
} from '../../api/interfaces';

const HomeScreen = () => {
  const [glucoseReadings, setGlucoseReadings] = useState<UserGlucoseReadings>({
    readings: [],
    isLoading: true,
    error: null,
  });
  const [numberOfReadings, setNumberOfReadings] = useState<number>(0);

  const [
    fourteenDayReadings,
    setFourteenDayReadings,
  ] = useState<AllGlucoseLevelsOnly>({
    glucoseLevels: [],
    isLoading: true,
    error: null,
  });
  const [fourteenDayAverage, setFourteenDayAverage] = useState<number>(0);

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

  const getFourteenDayReadings = () => {
    axios
      .get<GlucoseLevelOnly[]>(
        'http://10.0.2.2:8000/FourteenDayAvg/?patient_id=1',
      )
      .then((response: AxiosResponse) => {
        setFourteenDayReadings({
          glucoseLevels: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        setFourteenDayReadings({
          glucoseLevels: [],
          isLoading: false,
          error: err,
        });
        console.log(err);
      });
  };

  const calculateFourteenDayAverage = ({
    glucoseLevels,
  }: {
    glucoseLevels: GlucoseLevelOnly[];
  }) => {
    var glucoseSum = 0;
    glucoseLevels.map((reading) => {
      glucoseSum += reading.glucose_reading;
    });
    const average = (glucoseSum / glucoseLevels.length).toFixed(1);
    setFourteenDayAverage(Number(average));
  };

  useEffect(() => {
    getUserGlucoseLevels();
  }, [numberOfReadings]);

  useEffect(() => {
    if (glucoseReadings.readings.length > 0) {
      setNumberOfReadings(glucoseReadings.readings.length);
    }
  }, [glucoseReadings]);

  useEffect(() => {
    getFourteenDayReadings();
  }, []);

  useEffect(() => {
    calculateFourteenDayAverage(fourteenDayReadings);
  }, [fourteenDayReadings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        {!glucoseReadings.isLoading && glucoseReadings.error === null && (
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
        <GlucoseReadingIcon
          isEmpty={false}
          glucoseReading={fourteenDayAverage}
          units="mg/dL"
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
