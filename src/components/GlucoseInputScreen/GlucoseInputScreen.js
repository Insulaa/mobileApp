import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions, useNavigation} from '@react-navigation/native';
import HomeButton from '../Buttons/HomeButton';
import {useState} from 'react';
import SkipButton from '../Buttons/SkipButton';
import DropDownPicker from 'react-native-dropdown-picker';

const GlucoseInputScreen = () => {
  const navigation = useNavigation();
  let [glucoseLevel, setGlucoseLevel] = useState(0);
  let [glucoseUnit, setGlucoseUnit] = useState('mg');
  let [glucoseReadings, setGlucoseReadings] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your {'\n'}Glucose Reading!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          onChangeText={(val) => setGlucoseLevel(val)}
          keyboardType="numeric"
        />
        <DropDownPicker
          items={[
            {
              label: 'mg/dL',
              value: 'mg',
            },
            {
              label: 'mmol/L',
              value: 'mmol',
            },
          ]}
          defaultValue={glucoseUnit}
          style={styles.unitInput}
          labelStyle={{
            fontSize: 16,
            textAlign: 'left',
            color: '#000',
          }}
          activeLabelStyle={{fontWeight: 'bold'}}
          containerStyle={styles.unitInputContainer}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setGlucoseUnit(item.value)}
        />
      </View>
      <SkipButton />
      <HomeButton
        buttonText="SUBMIT"
        onPress={() => {
          navigation.navigate('Home');
          setGlucoseReadings(glucoseReadings.concat(glucoseLevel));
        }}
      />
    </View>
  );
};

export default GlucoseInputScreen;
