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
  let [user, setUser] = React.useState('A');

  const fetchUser = () => {
    axios
      .get(
        'http://10.0.2.2:8000/views/patients/?user_id=a38df304-c3f8-4bbf-843d-640f7c664657',
      )
      .then((response) => {
        setUser(response.data[0]['last_name']);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
