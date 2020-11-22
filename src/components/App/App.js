import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const App = () => {
  let [user, setUser] = React.useState('');

  const fetchUser = () => {
    axios
      .get(
        'http://localhost:3000/views/patients/?user_id=a38df304-c3f8-4bbf-843d-640f7c664657',
      )
      .then((response) => {
        console.log('SHOULD WORK');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 36,
    alignSelf: 'center',
    color: 'black',
  },
  body: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'black',
  },
});

export default App;
