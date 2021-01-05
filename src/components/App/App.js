import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableHighlight, StyleSheet, Button} from 'react-native';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Button
        title="Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button
        title="Medications"
        onPress={() => {
          navigation.navigate('Medications');
        }}
      />
    </View>
  );
}

function MedicationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Medication Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Glucose"
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: {fontSize: 12},
          style: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen
          name="Glucose"
          component={HomeScreen}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="Medications"
          component={MedicationsScreen}
          options={{tabBarLabel: 'Medications'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
