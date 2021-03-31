import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import MedicationScreenButton from '../Buttons/MedicationScreenButton';
import styles from './styles';
import ServicesContext from '../../servicesContext';
import {actions as userMedicationActions} from '../../redux/userMedicationStore';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {UserMedication} from '../../api/medicationService';
import ClickableTextButton from '../Buttons/ClickableTextButton';

const patientId = 1;

const MedicationsScreen = () => {
  const dispatch = useDispatch();
  const {medicationService} = useContext(ServicesContext);
  const navigation = useNavigation();

  const {
    userMedications,
    medicationExpanded,
    isLoading: isUserMedicationsLoading,
    error: userMedicationError,
  } = useSelector((state: RootState) => state.userMedicationStore);

  const onAddMedicationButtonClick = () => {
    navigation.navigate('AddMedication');
  };

  useEffect(() => {
    dispatch(
      userMedicationActions.doFetchUserCurrentMedicationsAsync({
        patientId,
        medicationService,
      }),
    );
  }, []);

  const onPressMedicationButton = (medicationId: number) => {
    dispatch(userMedicationActions.doSetMedicationToExpand(medicationId));
    navigation.navigate('MedicationDetails');
  };

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
          <MedicationScreenButton onPress={onAddMedicationButtonClick} />
        </View>
        <Text style={styles.title}>Add Medication</Text>
      </View>
      {!isUserMedicationsLoading && userMedicationError == null && (
        <View style={styles.medicationsContainer}>
          <Text style={styles.title}>Current Diabetes Medications</Text>
          {createListHeader()}
          {userMedications.map((medication, index) => {
            return (
              <View key={index} style={styles.listRowContainer}>
                <View style={styles.rowEntry}>
                  <ClickableTextButton
                    text={medication.medication.medication_name}
                    onPress={() =>
                      onPressMedicationButton(medication.medication_input_id)
                    }
                    textSize={16}
                  />
                </View>
                <View style={styles.rowEntry}>
                  <Text style={styles.entryText}>
                    {medication.dosage} {medication.unit}
                  </Text>
                </View>
                <View style={styles.rowEntry}>
                  <Text style={styles.entryText}>
                    {medication.frequency}/{medication.frequency_period}
                  </Text>
                </View>
                <View style={styles.rowEntry}>
                  <Text style={styles.entryText}>{medication.start}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MedicationsScreen;
