import React, {useState, useEffect, useContext} from 'react';
import styles from './styles';
import {View, Text, StatusBar} from 'react-native';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import MainButton from '../Buttons/MainButton';

const UserProfileScreen = () => {
  const [upperGlucoseBound, setUpperGlucoseBound] = useState<string>('');
  const [lowerGlucoseBound, setLowerGlucoseBound] = useState<string>('');

  const [patientHeightCm, setPatientHeightCm] = useState<string>('');
  const [patientHeightFeet, setPatientHeightFeet] = useState<string>('');
  const [patientHeightInches, setPatientHeightInches] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<string>('feet');
  const [patientWeight, setPatientWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<string>('lb');
  const [patientSex, setPatientSex] = useState<string>('');

  const heightUnitsList: {label: string; value: string}[] = [
    {
      label: 'cm',
      value: 'cm',
    },
    {
      label: 'feet',
      value: 'feet',
    },
  ];

  const weightUnitsList: {label: string; value: string}[] = [
    {
      label: 'lb',
      value: 'lb',
    },
    {
      label: 'kg',
      value: 'kg',
    },
  ];

  const sexOptionsList: {label: string; value: string}[] = [
    {
      label: 'Male',
      value: 'M',
    },
    {
      label: 'Female',
      value: 'F',
    },
    {
      label: 'Other',
      value: 'O',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Settings</Text>
      <Text style={styles.heading}>Height</Text>
      <View style={[styles.inputContainer, {flex: 1.2}]}>
        {heightUnit === 'feet' && (
          <>
            <View style={styles.internalContainer}>
              <Text style={styles.label}>Feet</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="0"
                keyboardType="numeric"
                value={patientHeightFeet}
                onChangeText={setPatientHeightFeet}
              />
            </View>
            <View style={styles.internalContainer}>
              <Text style={styles.label}>Inches</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="0"
                keyboardType="numeric"
                value={patientHeightInches}
                onChangeText={setPatientHeightInches}
              />
            </View>
          </>
        )}
        {heightUnit === 'cm' && (
          <View style={[styles.internalContainer, {flex: 0.4}]}>
            <Text style={styles.label}>Cm</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="0"
              keyboardType="numeric"
              value={patientHeightCm}
              onChangeText={setPatientHeightCm}
            />
          </View>
        )}
        <View style={styles.internalContainer}>
          <Text style={styles.label}>Units</Text>
          <DropDownPicker
            items={heightUnitsList}
            containerStyle={[styles.dropdownInputContainer, {height: 37}]}
            style={styles.dropDownInput}
            labelStyle={{
              fontSize: 16,
              textAlign: 'center',
              color: '#000',
            }}
            placeholder={heightUnit}
            onChangeItem={(item) => setHeightUnit(item.value)}
          />
        </View>
      </View>
      <Text style={[styles.heading, {marginTop: 20}]}>Weight</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          placeholder="0"
          keyboardType="numeric"
          value={patientHeightInches}
          onChangeText={setPatientHeightInches}
        />
        <DropDownPicker
          items={weightUnitsList}
          containerStyle={styles.dropdownInputContainer}
          style={styles.dropDownInput}
          labelStyle={{
            fontSize: 16,
            textAlign: 'center',
            color: '#000',
          }}
          placeholder={weightUnit}
          onChangeItem={(item) => setWeightUnit(item.value)}
        />
      </View>
      <Text style={styles.heading}>Sex</Text>
      <View style={styles.inputContainer}>
        <DropDownPicker
          items={sexOptionsList}
          containerStyle={styles.dropdownInputContainer}
          style={styles.dropDownInput}
          labelStyle={{
            fontSize: 16,
            textAlign: 'center',
            color: '#000',
          }}
          placeholder={'Select'}
          onChangeItem={(item) => setPatientSex(item.value)}
        />
      </View>
      <Text style={styles.heading}>Glucose Range</Text>
      <View style={[styles.inputContainer, {flex: 1.2}]}>
        <View style={styles.internalContainer}>
          <Text style={styles.label}>Lower Limit</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={upperGlucoseBound}
            onChangeText={setUpperGlucoseBound}
          />
        </View>
        <View style={styles.internalContainer}>
          <Text style={styles.label}>Upper Limit</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={lowerGlucoseBound}
            onChangeText={setLowerGlucoseBound}
          />
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          {flex: 1.8, justifyContent: 'center', marginLeft: 0},
        ]}>
        <MainButton onPress={() => {}} text="SUBMIT" />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
