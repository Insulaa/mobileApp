import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import HomeButton from '../Buttons/HomeButton';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {RootState} from '../../redux/rootReducer';
import {actions as medicationActions} from '../../redux/medicationStore';
import {MedicationMasterData} from '../../api/medicationService';
import {Dropdown} from 'react-native-material-dropdown-v2';
import SearchableDropdown from 'react-native-searchable-dropdown';

const AddMedicationScreen = () => {
  const apiUrl = 'http://10.0.2.2:8000/views/MedicationMaster/';

  const dispatch = useDispatch();
  const {medicationService} = useContext(ServicesContext);

  type medicationType = {
    id: number;
    name: string;
  };

  type medicationNameType = medicationType[];

  const [medicationNames, setMedicationNames] = useState<medicationNameType>([
    {
      id: 1,
      name: 'Codeine',
    },
    {
      id: 2,
      name: 'Advil',
    },
    {
      id: 3,
      name: 'Other Med',
    },
  ]);
  const [selection, setSelection] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);

  const {
    medications: medicationList,
    isLoading: isMedicationListLoading,
    error: medicationListError,
  } = useSelector((state: RootState) => state.medicationStore);

  useEffect(() => {
    dispatch(
      medicationActions.doFetchMedicationMasterDataAsync({medicationService}),
    );
    console.log(medicationList);
  }, []);

  return (
    <>
      <Text style={styles.title}>Add a New Medication</Text>

      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Medication Name</Text>
          <SearchableDropdown
            items={medicationNames}
            containerStyle={styles.medicationInputContainer}
            onItemSelect={(item) => {
              setSelection(item);
            }}
            selectedItems={selection}
            itemStyle={{
              padding: 8,
              marginTop: 2,
              backgroundColor: '#D8D8D8',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222', fontSize: 16}}
            itemsContainerStyle={{maxHeight: 140}}
            textInputProps={{
              fontSize: 16,
              placeholder: 'Select Medication',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                borderBottomWidth: 1,
                borderColor: '#777',
                borderRadius: 5,
              },
            }}
            resetValue={false}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <View>
          <Text style={styles.heading}>Dosage</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="1000"
              keyboardType="numeric"
              label="Dosage"
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
            onClick={() => {
              setIsCurrent(!isCurrent);
            }}
            isChecked={isCurrent}
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
