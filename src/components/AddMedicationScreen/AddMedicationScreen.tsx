import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, FlatList, SectionList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MedicationScreenButton from '../Buttons/MedicationScreenButton';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import HomeButton from '../Buttons/HomeButton';

const AddMedicationScreen = () => {
  return (
    <>
      <Text style={styles.title}>Add a New Medication</Text>

      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Medication Name</Text>
          <View style={styles.inputContainer}>
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
              placeholder="Choose Medication"
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'left',
                color: '#000',
              }}
              containerStyle={styles.medicationInputContainer}
            />
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Dosage</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="1000"
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
              containerStyle={styles.dropdownInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="mg"
            />
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Frequency</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="2"
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
              containerStyle={styles.dropdownInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="Daily"
            />
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Start Date</Text>
          <View style={styles.inputContainer}>
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="DD"
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="MM"
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="YYYY"
            />
          </View>
        </View>
        <View>
          <Text style={styles.heading}>End Date</Text>
          <View style={styles.inputContainer}>
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="DD"
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="MM"
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
              containerStyle={styles.dateInputContainer}
              style={styles.dropDownInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                color: '#000',
              }}
              placeholder="YYYY"
            />
          </View>
          <CheckBox
            rightText="Until Present"
            style={styles.checkbox}
            rightTextStyle={styles.checkboxText}
          />
        </View>
        <View>
          <HomeButton onPress={() => {}} />
        </View>
      </View>
    </>
  );
};

export default AddMedicationScreen;
