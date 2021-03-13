import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import HomeButton from '../Buttons/HomeButton';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {RootState} from '../../redux/rootReducer';
import {
  actions as medicationActions,
  Medication,
} from '../../redux/medicationStore';
import {actions as userMedicationActions} from '../../redux/userMedicationStore';
import {MedicationMasterData} from '../../api/medicationService';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DatePicker from 'react-native-datepicker';

const frequencyTypesList: {label: string; value: string}[] = [
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Weekly',
    value: 'weekly',
  },
];

const unitTypesList: {label: string; value: string}[] = [
  {
    label: 'mg',
    value: 'mg',
  },
];

const AddMedicationScreen = () => {
  const dispatch = useDispatch();
  const {medicationService} = useContext(ServicesContext);
  const navigation = useNavigation();

  const [selection, setSelection] = useState<Medication[]>([]);
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [dosage, setDosage] = useState<number>(-1);
  const [medicationUnit, setMedicationUnit] = useState<string>('');
  const [frequency, setFrequency] = useState<number>(-1);
  const [frequencyPeriod, setFrequencyPeriod] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string | null>(null);

  const patientId = 1;

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

  const onSubmitMedicationButtonPress = () => {
    console.log(selection);
    dispatch(
      userMedicationActions.doAddUserCurrentMedicationAsync({
        patientId,
        medication: selection[0].id,
        image: 'posts/default.jpg',
        dosage,
        unit: medicationUnit,
        frequency,
        frequencyPeriod,
        isCurrent,
        startDate,
        endDate,
        medicationService,
      }),
    );
    navigation.goBack();
  };

  return (
    <>
      {!isMedicationListLoading && !medicationListError && (
        <>
          <Text style={styles.title}>Add a New Medication</Text>

          <View style={styles.container}>
            <View>
              <Text style={styles.heading}>Medication Name</Text>
              <View style={styles.medicationInputContainer}>
                <SearchableDropdown
                  items={medicationList}
                  selectedItems={selection[0]}
                  onItemSelect={(item: MedicationMasterData) => {
                    const items: MedicationMasterData[] = [];
                    items.push(item);
                    setSelection(items);
                  }}
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
                  multi={false}
                  setSort={(item, searchedText) =>
                    item.name
                      .toLowerCase()
                      .startsWith(searchedText.toLowerCase())
                  }
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
                  onChangeText={(val) => setDosage(Number(val))}
                />
                <DropDownPicker
                  items={unitTypesList}
                  containerStyle={styles.dropdownInputContainer}
                  style={styles.dropDownInput}
                  labelStyle={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#000',
                  }}
                  placeholder="Unit"
                  onChangeItem={(item) => setMedicationUnit(item.value)}
                />
              </View>
            </View>
            <View>
              <Text style={styles.heading}>Taken (i.e. 3 / Daily)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="2"
                  keyboardType="numeric"
                  onChangeText={(val) => setFrequency(Number(val))}
                />
                <DropDownPicker
                  items={frequencyTypesList}
                  containerStyle={styles.dropdownInputContainer}
                  style={styles.dropDownInput}
                  labelStyle={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#000',
                  }}
                  placeholder="Choose"
                  onChangeItem={(item) => setFrequencyPeriod(item.value)}
                />
              </View>
            </View>
            <View>
              <View style={styles.dateInputContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.calendarHeading}>Start Date</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    placeHolder="Select Date"
                    date={startDate}
                    mode="date"
                    onDateChange={setStartDate}
                    format="DD-MM-YYYY"
                    minDate="01-01-2000"
                    maxDate="01-01-2030"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                  />
                </View>
                {!isCurrent && (
                  <View style={styles.dateContainer}>
                    <Text style={styles.calendarHeading}>End Date</Text>
                    <DatePicker
                      style={styles.datePickerStyle}
                      placeHolder="Select Date"
                      date={endDate}
                      mode="date"
                      onDateChange={setEndDate}
                      format="DD-MM-YYYY"
                      minDate="01-01-2000"
                      maxDate="01-01-2030"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                    />
                  </View>
                )}
              </View>
              <CheckBox
                rightText="Currently Taking"
                style={styles.checkbox}
                rightTextStyle={styles.checkboxText}
                onClick={() => {
                  setIsCurrent(!isCurrent);
                  if (isCurrent) {
                    setEndDate(null);
                  }
                }}
                isChecked={isCurrent}
              />
            </View>
            <View>
              <HomeButton
                onPress={() => {
                  onSubmitMedicationButtonPress();
                }}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default AddMedicationScreen;
