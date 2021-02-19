import React, {Component} from 'react';
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
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import GlucoseInputScreen from '../GlucoseInputScreen/GlucoseInputScreen';
import {withNavigation} from 'react-navigation';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
import {useEffect} from 'react';

const HomeScreen = (props) => {
  let [user, setUser] = React.useState('');
  let [glucoseReadings, setGlucoseReadings] = React.useState([]);

  useEffect(() => {
    getUserGlucoseData();
  }, []);

  const getUserGlucoseData = () => {
    axios
      .get('http://10.0.2.2:8000/views/glucoseLevels/?user_id=1')
      .then((response) => {
        const glucoseList = response.data;
        console.log(glucoseList);
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon
          glucoseReading={12.2}
          time="10:06 AM"
          unit="mg/dL"
        />
        <GlucoseReadingIcon
          glucoseReading={10.5}
          time="12:26 PM"
          unit="mg/dL"
        />
        <GlucoseReadingIcon
          glucoseReading={14.1}
          time="06:35 PM"
          unit="mg/dL"
        />
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon glucoseReading={11.7} time="" unit="mg/dL" />
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
