import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import SetupScreen from '../SetupScreen/SetupScreen';
import MedicationsScreen from '../MedicationsScreen/MedicationsScreen';
import Header from '../Header/Header';
import {createStackNavigator} from '@react-navigation/stack';
import GlucoseInputScreen from '../GlucoseInputScreen/GlucoseInputScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';
import store from '../../redux/store';
import {Provider} from 'react-redux';
import ServicesContext from '../../servicesContext';
import createServices from '../../api/services';
import AddMedicationScreen from '../AddMedicationScreen/AddMedicationScreen';
import MedicationDetailsScreen from '../MedicationDetailsScreen/MedicationDetailsScreen';
import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
import BloodPressureScreen from '../BloodPressureScreen/BloodPressureScreen';
import BloodPressureInputScreen from '../BloodPressureInputScreen/BloodPressureInputScreen';

const Tab = createMaterialTopTabNavigator();
const services = createServices();

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
          navigation.navigate('Blood Pressure');
        }}>
        <Text>BLOOD PRESSURE</Text>
      </TouchableOpacity>
    </View>
  );
}

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
      <Tab.Screen name="Blood Pressure" component={BloodPressureScreen} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetupScreen"
        component={SetupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ServicesContext.Provider value={services}>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="GlucoseInput"
              component={GlucoseInputScreen}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="AddMedication"
              component={AddMedicationScreen}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="MedicationDetails"
              component={MedicationDetailsScreen}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="BloodPressureInput"
              component={BloodPressureInputScreen}
              options={{header: () => <Header />}}
            />
            <Stack.Screen
              name="Profile"
              component={UserProfileScreen}
              options={{header: () => <Header />}}
            />
          </Stack.Navigator>
        </ServicesContext.Provider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
