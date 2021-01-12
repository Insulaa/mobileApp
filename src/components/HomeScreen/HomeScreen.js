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
      <TouchableOpacity onPress={fetchUser}>
        <View style={styles.mainButton}>
          <Text style={styles.buttonText}>Get User</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text>{user}</Text>
      </View>
      <GlucoseScreenButton />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
