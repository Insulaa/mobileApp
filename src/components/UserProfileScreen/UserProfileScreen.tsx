import React, {useState, useEffect, useContext} from 'react';
import styles from './styles';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import ServicesContext from '../../servicesContext';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import MainButton from '../Buttons/MainButton';
import {actions as userProfileActions} from '../../redux/userProfileStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const {userProfileService} = useContext(ServicesContext);

  const {
    userInfo,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useSelector((state: RootState) => state.userProfileStore);

  console.log("USER INFO")
  console.log(userInfo)

  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);

  const patientId = userData.user.patient_id;

  useEffect(() => {
    dispatch(
      userProfileActions.doFetchUserProfileAsync({
        patientId,
        userProfileService,
      }),
    );
  }, []);

  const [upperGlucoseBound, setUpperGlucoseBound] = useState<number>(0);
  const [lowerGlucoseBound, setLowerGlucoseBound] = useState<number>(0);

  const [patientHeightCm, setPatientHeightCm] = useState<string>('');
  const [patientHeightFeet, setPatientHeightFeet] = useState<string>('');
  const [patientHeightInches, setPatientHeightInches] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<string>('feet');
  const [patientWeight, setPatientWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<string>('lb');
  const [patientSex, setPatientSex] = useState<string>('');
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

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
      label: 'lbs',
      value: 'lbs',
    },
    {
      label: 'kgs',
      value: 'kgs',
    },
  ];

  const sexOptionsList: {label: string; value: string}[] = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsInEditMode(!isInEditMode)}
        style={styles.icon}>
        <Icon name="square-edit-outline" color="#21A1FD" size={35} />
      </TouchableOpacity>
      {!userProfileLoading && userProfileError === null && (
        <>
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
                    defaultValue={userInfo.height1.toString()}
                    onChangeText={setPatientHeightFeet}
                    editable={isInEditMode}
                  />
                </View>
                <View style={styles.internalContainer}>
                  <Text style={styles.label}>Inches</Text>
                  <TextInput
                    style={styles.smallInput}
                    placeholder="0"
                    keyboardType="numeric"
                    defaultValue={userInfo.height2.toString()}
                    onChangeText={setPatientHeightInches}
                    editable={isInEditMode}
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
                  defaultValue={userInfo.height1.toString()}
                  onChangeText={setPatientHeightCm}
                  editable={isInEditMode}
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
                defaultValue={userInfo.height1_unit}
                onChangeItem={(item) => setHeightUnit(item.value)}
                disabled={!isInEditMode}
              />
            </View>
          </View>
          <Text style={[styles.heading, {marginTop: 20}]}>Weight</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.smallInput}
              placeholder="0"
              keyboardType="number-pad"
              defaultValue={userInfo.weight.toString()}
              onChangeText={setPatientHeightInches}
              editable={isInEditMode}
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
              defaultValue={userInfo.weight_unit}
              onChangeItem={(item) => setWeightUnit(item.value)}
              disabled={!isInEditMode}
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
              defaultValue={userInfo.sex}
              placeholder={'Select'}
              onChangeItem={(item) => setPatientSex(item.value)}
              disabled={!isInEditMode}
            />
          </View>
          <Text style={styles.heading}>Glucose Range</Text>
          <View style={[styles.inputContainer, {flex: 1.2}]}>
            <View style={styles.internalContainer}>
              <Text style={styles.label}>Lower Limit</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                defaultValue={userInfo.glucose_lower_limit.toString()}
                onChangeText={(val) => setLowerGlucoseBound(Number(val))}
                editable={isInEditMode}
              />
            </View>
            <View style={styles.internalContainer}>
              <Text style={styles.label}>Upper Limit</Text>
              <TextInput
                style={styles.input}
                defaultValue={String(userInfo.glucose_upper_limit)}
                keyboardType="numeric"
                onChangeText={(val) => setUpperGlucoseBound(Number(val))}
                editable={isInEditMode}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default UserProfileScreen;
