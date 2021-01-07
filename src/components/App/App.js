import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import Header from '../Header/Header';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>GLUCOSE</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Medications');
        }}>
        <Text>MEDICATION</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Exercise');
        }}>
        <Text>EXERCISE</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          navigation.navigate('Diet');
        }}>
        <Text>DIET</Text>
      </TouchableHighlight>
    </View>
  );
}

function MedicationsScreen({navigation}) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Medication Screen</Text>
    </View>
  );
}

function ExerciseScreen({navigation}) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Exercise Screen</Text>
    </View>
  );
}

function DietScreen({navigation}) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Diet Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          labelStyle: {fontSize: 16},
          tabStyle: {width: 100},
          style: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="Medications"
          component={MedicationsScreen}
          options={{tabBarLabel: 'Medications'}}
        />
        <Tab.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{tabBarLabel: 'Exercise'}}
        />
        <Tab.Screen
          name="Diet"
          component={DietScreen}
          options={{tabBarLabel: 'Diet'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
