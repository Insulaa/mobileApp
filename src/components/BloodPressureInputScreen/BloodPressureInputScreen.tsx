import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import MainButton from '../Buttons/MainButton';
import {useState} from 'react';
import ClickableTextButton from '../Buttons/ClickableTextButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import ServicesContext from '../../servicesContext';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {actions as bloodPressureActions} from '../../redux/bloodPressureStore';
import DismissKeyboard from '../Util/DismissKeyboard';

const BloodPressureInputScreen = () => {
  const dispatch = useDispatch();
  const {bloodPressureService} = useContext(ServicesContext);

  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);

  const patientId = userData.user.patient_id;
  let [systolicValue, setSystolicValue] = useState<number>(0);
  let [diastolicValue, setDiastolicValue] = useState<number>(0);

  const navigation = useNavigation();

  const onSubmitButtonPress = () => {
    dispatch(
      bloodPressureActions.doAddBloodPressureReadingAsync({
        systolic: systolicValue,
        diastolic: diastolicValue,
        patientId,
        bloodPressureService,
      }),
    );
    navigation.navigate('Home');
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter Your Blood {'\n'}Pressure Reading!
        </Text>
        <Text style={styles.heading}>Systolic (Top) Reading</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numberInput}
            onChangeText={(val) => setSystolicValue(Number(val))}
            keyboardType="numeric"
          />
          <View style={styles.unitInputContainer}>
            <Text style={styles.unitInput}>mmHg</Text>
          </View>
        </View>
        <Text style={styles.heading}>Diastolic (Bottom) Reading</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numberInput}
            onChangeText={(val) => setDiastolicValue(Number(val))}
            keyboardType="numeric"
          />
          <View style={styles.unitInputContainer}>
            <Text style={styles.unitInput}>mmHg</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ClickableTextButton
            text="Skip For Now"
            onPress={() => navigation.goBack()}
            textSize={20}
          />
        </View>
        <View style={[styles.buttonContainer, {marginBottom: 80}]}>
          <MainButton onPress={onSubmitButtonPress} text="SUBMIT" />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default BloodPressureInputScreen;
