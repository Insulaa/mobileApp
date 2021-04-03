import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import styles from './styles';
import {RootState} from '../../redux/rootReducer';
import {actions as userMedicationActions} from '../../redux/userMedicationStore';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {UserMedication} from '../../api/medicationService';
import MainButton from '../Buttons/MainButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MedicationDetailsScreen = () => {
  const {
    userMedications: medicationList,
    medicationExpanded: medId,
    isLoading: isMedicationListLoading,
    error: medicationListError,
  } = useSelector((state: RootState) => state.userMedicationStore);

  const [medication, setMedication] = useState<UserMedication[]>([]);

  useEffect(() => {
    !isMedicationListLoading
      ? setMedication(
          medicationList.filter((x) => x.medication_input_id === medId),
        )
      : [];
  }, [medId]);

  return (
    <>
      <Text style={styles.title}>Medication Details</Text>
      <View style={styles.container}>
        {!isMedicationListLoading &&
          medicationListError === null &&
          medication.length > 0 && (
            <>
              <Icon
                name="square-edit-outline"
                color="#21A1FD"
                size={35}
                style={styles.icon}
              />
              <Text style={styles.heading}>
                {medication[0].medication.medication_name}
              </Text>
              <View style={styles.subContainer}>
                <View style={styles.detailsContainer}>
                  <Image
                    source={{uri: medication[0].image}}
                    style={styles.image}
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}> Dose: </Text>
                    <Text style={styles.text}>
                      {medication[0].dosage} {medication[0].unit}
                    </Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}> Take: </Text>
                    <Text style={styles.text}>
                      {medication[0].frequency}/{medication[0].frequency_period}
                    </Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}> From: </Text>
                    <Text style={styles.text}>{medication[0].start}</Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}> To: </Text>
                    {medication[0].currently_taking === true && (
                      <Text style={styles.text}>Present</Text>
                    )}
                    {medication[0].currently_taking === true && (
                      <Text style={styles.text}>{medication[0].end}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View
                style={[styles.detailsContainer, {marginLeft: 10, flex: 0.6}]}>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>Notes:</Text>
                  <Text style={styles.text}>
                    I like this medication. No bad side effects!
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.detailsContainer,
                  {alignItems: 'center', marginRight: 0},
                ]}>
                <MainButton onPress={() => {}} text="END MEDICATION" />
                <MainButton onPress={() => {}} text="DELETE MEDICATION" />
              </View>
            </>
          )}
      </View>
    </>
  );
};

export default MedicationDetailsScreen;
