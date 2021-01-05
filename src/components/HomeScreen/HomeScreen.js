import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import styles from './styles';

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
      <Text style={styles.title}>First API Call</Text>
      <Text style={styles.body}>Press the Button to get User Info</Text>
      <TouchableHighlight onPress={fetchUser}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get User</Text>
        </View>
      </TouchableHighlight>
      <View>
        <Text>{user}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
