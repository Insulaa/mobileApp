import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';

type GlucoseListType = {
  date: string;
  glucose_reading: number;
  id: number;
  patient_id: number;
  timestamp: string;
}


const HomeScreen = () => {
  const [userGlucoseReadings, setUserGlucoseReadings] = React.useState<GlucoseListType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState("");

  let glucoseReadings: GlucoseListType[] = [];
  let glucoseReading: GlucoseListType = {
    date: '',
    glucose_reading: -1,
    id: -1,
    patient_id: -1,
    timestamp: ''
  };

  const addReading = (reading: GlucoseListType) => setUserGlucoseReadings(state => [...state, reading]);

  useEffect(() => {
    getUserGlucoseData();
  }, []);

  const getUserGlucoseData = () => {
    axios
      .get<GlucoseListType[]>(
        'http://10.0.2.2:8000/GlucoseToday/?patient_id=1',
        {
        headers: {
          "Content-Type": "application/json"
        },
        })
      .then((response) => {
        response.data.map (
          reading => {
            glucoseReading.date = reading.date;
            glucoseReading.glucose_reading = reading.glucose_reading;
            glucoseReading.id = reading.id;
            glucoseReading.patient_id = reading.patient_id;
            glucoseReading.timestamp = reading.timestamp;
            addReading(glucoseReading);
          }
        )
      })
      .then(() => {
        setLoading(false);
        console.log(userGlucoseReadings);
        console.log(loading);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      {!loading &&
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon glucoseReading={userGlucoseReadings[0].glucose_reading} units="mg/dL" time={userGlucoseReadings[0].timestamp}/>
        <GlucoseReadingIcon glucoseReading={userGlucoseReadings[0].glucose_reading} units="mg/dL" time={userGlucoseReadings[0].timestamp}/>
        <GlucoseReadingIcon glucoseReading={userGlucoseReadings[0].glucose_reading} units="mg/dL" time={userGlucoseReadings[0].timestamp}/>
      </View>
      }
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <Text>
          
        </Text>
        <GlucoseReadingIcon glucoseReading={userGlucoseReadings[0].glucose_reading} units="mg/dL" time={userGlucoseReadings[0].timestamp}/>
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
