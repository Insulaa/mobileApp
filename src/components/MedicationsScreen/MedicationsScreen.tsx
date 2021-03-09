import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, FlatList, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MedicationScreenButton from '../Buttons/MedicationScreenButton';
import styles from './styles';

type EntryType = {
  id: number;
  title: string;
  dose: number;
  units: string;
  timesTaken: number;
  frequency: string;
  from: string;
  to: string;
};

const medicationData = [
  {
    id: 1,
    title: 'Metmorfin',
    dose: 150,
    units: 'mg',
    timesTaken: 3,
    frequency: 'daily',
    from: '2020-01-23',
    to: '3000-01-01',
  },
  {
    id: 2,
    title: 'Exenatide',
    dose: 50,
    units: 'mg',
    timesTaken: 2,
    frequency: 'daily',
    from: '2020-01-23',
    to: '3000-01-01',
  },
  {
    id: 3,
    title: 'Glipizide',
    dose: 1000,
    units: 'mg',
    timesTaken: 1,
    frequency: 'weekly',
    from: '2020-01-23',
    to: '3000-01-01',
  },
];

const MedicationsScreen = () => {
  const check = true;

  const createListHeader = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View style={styles.headerEntry}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.headerEntry}>
          <Text style={styles.headerText}>Dosage</Text>
        </View>
        <View style={styles.headerEntry}>
          <Text style={styles.headerText}>Amount</Text>
        </View>
        <View style={styles.headerEntry}>
          <Text style={styles.headerText}>Since</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <MedicationScreenButton />
        </View>
        <Text style={styles.title}>Add Medication</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <MedicationScreenButton />
        </View>
        <Text style={styles.title}>Export Summary</Text>
      </View>
      <View style={styles.medicationsContainer}>
        <Text style={styles.title}>Current Diabetes Medications</Text>
        {createListHeader()}
        {medicationData.map((medication, index) => {
          return (
            <View key={index} style={styles.listRowContainer}>
              <View style={styles.rowEntry}>
                <Text style={styles.entryText}>{medication.title}</Text>
              </View>
              <View style={styles.rowEntry}>
                <Text style={styles.entryText}>
                  {medication.dose} {medication.units}
                </Text>
              </View>
              <View style={styles.rowEntry}>
                <Text style={styles.entryText}>
                  {medication.timesTaken}/{medication.frequency}
                </Text>
              </View>
              <View style={styles.rowEntry}>
                <Text style={styles.entryText}>{medication.from}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MedicationsScreen;
