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

const HomeScreen = () => {
  let [user, setUser] = React.useState('');
  let [glucoseReadings, setGlucoseReadings] = React.useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon />
        <GlucoseReadingIcon />
        <GlucoseReadingIcon />
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon />
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
