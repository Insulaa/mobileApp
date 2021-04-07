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
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';


const RegisterScreen = (props) => {
  const {userService} = useContext(ServicesContext);

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleRegisterButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please fill first name');
      return;
    }
    if (!userLastName) {
      alert('Please fill last name');
      return;
    }
    if (!phoneNumber) {
      alert('Please fill phone number');
      return;
    }
    if (!userEmail) {
      alert('Please fill email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    const response = userService.registerUser({
        first_name: userFirstName,
        last_name: userLastName,
        password: userPassword,
        email: userEmail, 
        phone_number: phoneNumber,
    });

    if (response) {
      alert('Account successfully created!')
      props.navigation.navigate('LoginScreen')
    }
    else {
      alert('Registration failed.  Please try again.')
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
        <View style={{alignItems: 'center'}}>
        </View>
        <KeyboardAvoidingView enabled>
          <Text style={styles.header}>First Name</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserFirstName) => setUserFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Last Name</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLastName) => setUserLastName(UserLastName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Password</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Phone Number</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
              underlineColorAndroid="#f000"
              placeholder="Enter Phone Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Email</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <GlucoseScreenButton
            buttonText="Create User"
            onPress={() => handleRegisterButton()}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
