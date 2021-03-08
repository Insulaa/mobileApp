import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MedicationScreenButton from '../Buttons/MedicationScreenButton'
import styles from './styles';


const MedicationEntry = () => {

    return (
        <View style={styles.medicationEntry}>
            <Text>INFO</Text>
        </View>
    )
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

const MedicationsScreen = () => {

    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          style={{ backgroundColor }}
        />
      );
    };
    

    const medicationData = [
        {
            id: '1',
            title: 'Metmorfin',
            dose: 150,
            units: 'mg',
            timesTaken: 3,
            frequency: 'daily',
            from: '2020-01-23',
            to: '3000-01-01',
        },
        {
            id: '2',
            title: 'Exenatide',
            dose: 50,
            units: 'mg',
            timesTaken: 2,
            frequency: 'daily',
            from: '2020-01-23',
            to: '3000-01-01',
        },
        {
            id: '3',
            title: 'Glipizide',
            dose: 1000,
            units: 'mg',
            timesTaken: 1,
            frequency: 'weekly',
            from: '2020-01-23',
            to: '3000-01-01'
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <MedicationScreenButton/>
                </View>
                <Text style={styles.title}>Add Medication</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <MedicationScreenButton/>
                </View>
                <Text style={styles.title}>Export Summary</Text>
            </View>
            <View style = {styles.medicationsContainer}>
            <Text style={styles.title}>Current Diabetes Medications</Text>
            <FlatList
        data={medicationData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
            </View>
        </View>
    )
}

export default MedicationsScreen;