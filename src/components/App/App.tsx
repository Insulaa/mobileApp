import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import Header from '../Header/Header';
import {createStackNavigator} from '@react-navigation/stack';
import GlucoseInputScreen from '../GlucoseInputScreen/GlucoseInputScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from "../RegisterScreen/RegisterScreen"

const Tab = createMaterialTopTabNavigator();

function MyTabBar({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>GLUCOSE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          navigation.navigate('Medications');
        }}>
        <Text>MEDS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          navigation.navigate('Exercise');
        }}>
        <Text>EXERCISE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          navigation.navigate('Diet');
        }}>
        <Text>DIET</Text>
      </TouchableOpacity>
    </View>
  );
}

const MedicationsScreen = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Medication Screen</Text>
    </View>
  );
};

const ExerciseScreen = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Exercise Screen</Text>
    </View>
  );
};

const DietScreen = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Diet Screen</Text>
    </View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarOptions={{
        labelStyle: {fontSize: 16},
        tabStyle: {width: 100},
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medications" component={MedicationsScreen} />
      <Tab.Screen name="Exercise" component={ExerciseScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="GlucoseInput" component={GlucoseInputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
