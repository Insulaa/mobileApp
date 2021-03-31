import React, {useState, createRef} from 'react';
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
import UserService, {User} from '../../api/userService'

const RegisterScreen = (props) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const firstNameInputRef = createRef();
  const lastNameInputRef = createRef();
  const emailInputRef = createRef();
  const phoneNumberInputRef = createRef();
  const passwordInputRef = createRef();

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

    let userService = new UserService;
    const response = userService.registerUser({
        first_name: userFirstName,
        last_name: userLastName,
        password: userPassword,
        email: userEmail, 
        phone_number: phoneNumber,
    });
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
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserFirstName) => setUserFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              ref={firstNameInputRef}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                firstNameInputRef.current && 
                firstNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLastName) => setUserLastName(UserLastName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              ref={lastNameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameInputRef.current &&
                lastNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
              underlineColorAndroid="#f000"
              placeholder="Enter Phone Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={phoneNumberInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                phoneNumberInputRef.current &&
                phoneNumberInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleRegisterButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
