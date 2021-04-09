import React, {useState, createRef, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Loader from '../Loader/loader';
import ServicesContext from '../../servicesContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

const SetupScreen = (props) => {
  const {userProfileService} = useContext(ServicesContext);
  const {userService} = useContext(ServicesContext);
  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);

  const patient_id = userData.user.patient_id;
  const [date_of_birth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('male');
  const [height1, setHeight1] = useState('');
  const [height1_unit, setHeight1Unit] = useState('feet');
  const [height2, setHeight2] = useState('');
  const [height2_unit, setHeight2Unit] = useState('inches');
  const [weight, setWeight] = useState('');
  const [weight_unit, setWeightUnit] = useState('lbs');
  const [glucose_lower_limit, setGlucoseLowerLimit] = useState<number>(-1);
  const [glucose_upper_limit, setGlucoseUpperLimit] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmitButton = () => {
    const response = userProfileService.setUserProfileData({
      patient_id: patient_id,
      date_of_birth: date_of_birth,
      sex: sex,
      height1: height1,
      height1_unit: height1_unit,
      height2: height2,
      height2_unit: height2_unit,
      weight: weight,
      weight_unit: weight_unit,
      glucose_lower_limit: 3.9,
      glucose_upper_limit: 10,
    });

    if (response) {
      userService.setCompletedSetupTrue({patient_id});
      props.navigation.navigate('Home');
    } else {
      alert('User profile setup failed.  Try again.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}></View>
        <KeyboardAvoidingView enabled>
          <Text style={styles.header}>Select your sex</Text>
          <View style={styles.SectionStyle}>
            <DropDownPicker
              items={[
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'male',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ]}
              defaultValue={sex}
              style={styles.unitInput}
              labelStyle={{
                fontSize: 16,
                textAlign: 'left',
                color: '#000',
              }}
              activeLabelStyle={{fontWeight: 'bold'}}
              containerStyle={styles.unitInputContainer}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setSex(item.value)}
            />
          </View>
          <Text style={styles.header}>Date of birth (yyyy/mm/dd)</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
              underlineColorAndroid="#f000"
              placeholder="Date of Birth"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Height (feet)</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(height1) => setHeight1(height1)}
              underlineColorAndroid="#f000"
              placeholder="Feet"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Height (inches)</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(height2) => setHeight2(height2)}
              underlineColorAndroid="#f000"
              placeholder="Inches"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Weight (lbs)</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(weight) => setWeight(weight)}
              underlineColorAndroid="#f000"
              placeholder="Weight (lbs)"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Confirm</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SetupScreen;
