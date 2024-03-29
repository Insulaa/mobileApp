import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import MainButton from '../Buttons/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {RootState} from '../../redux/rootReducer';
import {
  actions as medicationActions,
  Medication,
} from '../../redux/medicationStore';
import {actions as userMedicationActions} from '../../redux/userMedicationStore';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import DismissKeyboard from '../Util/DismissKeyboard';

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
  {
    label: 'mcg',
    value: 'mcg',
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
  const [startDate, setStartDate] = useState<Date>(new Date(1598051730000));
  const [endDate, setEndDate] = useState<Date>(new Date(1598051730000));

  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);

  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);

  const patientId = userData.user.patient_id;

  const {
    medications: medicationList,
    isLoading: isMedicationListLoading,
    error: medicationListError,
  } = useSelector((state: RootState) => state.medicationStore);

  useEffect(() => {
    dispatch(
      medicationActions.doFetchMedicationMasterDataAsync({medicationService}),
    );
  }, []);

  const onSubmitMedicationButtonPress = () => {
    dispatch(
      userMedicationActions.doAddUserCurrentMedicationAsync({
        patientId,
        medication: selection[0].id,
        image: null,
        dosage,
        unit: medicationUnit,
        frequency,
        frequencyPeriod,
        isCurrent,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        medicationService,
      }),
    );
    navigation.goBack();
  };

  const onStartDateChange = (event, selectedDate) => {
    const date = selectedDate || startDate;
    setStartDate(date);
    setShowStartDate(false);
  };

  const onEndDateChange = (event, selectedDate) => {
    const date = selectedDate || endDate;
    setEndDate(date);
    setShowEndDate(false);
  };

  return (
    <>
      {!isMedicationListLoading && !medicationListError && (
        <>
          <Text style={styles.title}>Add a New Medication</Text>
          <DismissKeyboard>
            <View style={styles.container}>
              <View>
                <Text style={styles.heading}>Medication Name</Text>
                <View style={styles.medicationInputContainer}>
                  <SearchableDropdown
                    items={medicationList}
                    selectedItems={selection[0]}
                    onItemSelect={(item: Medication) => {
                      const items: Medication[] = [];
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
                    <View style={styles.calendarButton}>
                      <TouchableOpacity onPress={() => setShowStartDate(true)}>
                        {startDate === new Date(1598051730000) && (
                          <Text style={{fontSize: 16}}>
                            {' '}
                            Select Start Date{' '}
                          </Text>
                        )}
                        {startDate !== new Date(1598051730000) && (
                          <Text style={{fontSize: 16}}>
                            {format(startDate, 'yyyy - MM - dd')}{' '}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    {showStartDate && (
                      <DateTimePicker
                        style={styles.datePickerStyle}
                        display="default"
                        value={startDate}
                        mode="date"
                        onChange={onStartDateChange}
                        minimumDate={new Date(1950, 0, 1)}
                        maximumDate={new Date(2300, 10, 20)}
                      />
                    )}
                  </View>
                  {!isCurrent && (
                    <View style={styles.dateContainer}>
                      <Text style={styles.calendarHeading}>End Date</Text>
                      <View style={styles.calendarButton}>
                        <TouchableOpacity onPress={() => setShowEndDate(true)}>
                          {endDate === new Date(1598051730000) && (
                            <Text style={{fontSize: 16}}>
                              {' '}
                              Select End Date{' '}
                            </Text>
                          )}
                          {endDate !== new Date(1598051730000) && (
                            <Text style={{fontSize: 16}}>
                              {format(endDate, 'yyyy - MM - dd')}{' '}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                      {showEndDate && (
                        <DateTimePicker
                          style={styles.datePickerStyle}
                          display="default"
                          value={endDate}
                          mode="date"
                          onChange={onEndDateChange}
                          minimumDate={new Date(1950, 0, 1)}
                          maximumDate={new Date(2300, 10, 20)}
                        />
                      )}
                    </View>
                  )}
                </View>
                <CheckBox
                  rightText="Currently Taking"
                  style={styles.checkbox}
                  rightTextStyle={styles.checkboxText}
                  onClick={() => {
                    setIsCurrent(!isCurrent);
                  }}
                  isChecked={isCurrent}
                />
              </View>
              <View>
                <MainButton
                  onPress={() => {
                    onSubmitMedicationButtonPress();
                  }}
                  text="SUBMIT"
                />
              </View>
            </View>
          </DismissKeyboard>
        </>
      )}
    </>
  );
};

export default AddMedicationScreen;
