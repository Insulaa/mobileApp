import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';

const HomeScreen = () => {
  let [user, setUser] = React.useState('A');
  let [isGlucoseInputted, setIsGlucoseInputted] = React.useState(false);
  let [glucoseLevel, setGlucoseLevel] = React.useState('0');

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

  // const submitButtonPressed = () => {
  //   if (isGlucoseInputted === false) {
  //     setIsGlucoseInputted(true);
  //   }
  // };

  // const skipButtonPressed = () => {
  //   if (isGlucoseInputted === false) {
  //     setIsGlucoseInputted(true);
  //   }
  // };

  return (
    <View style={styles.container}>
      {!isGlucoseInputted && (
        <>
          <Text style={styles.title}>Enter Your {'\n'}Glucose Reading!</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => setGlucoseLevel(val)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.clickableText}>Skip For Now</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              colors={['#1D6EA8', '#21A1FD']}
              style={styles.mainButton}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
      {isGlucoseInputted && (
        <>
          <Text style={styles.title}>First API Call</Text>
          <Text style={styles.body}>Press the Button to get User Info</Text>
          <TouchableOpacity onPress={fetchUser}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get User</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text>{user}</Text>
          </View>
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
