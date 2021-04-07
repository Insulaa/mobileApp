import React, {useState, createRef, useContext} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import RegisterButton from '../Buttons/RegisterButton';
import AsyncStorage from '@react-native-community/async-storage';
import ServicesContext from '../../servicesContext';
import {actions as userActions} from '../../redux/userStore';
import Loader from '../Loader/loader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';

const LoginScreen = ({navigation}) => {
  const {userService} = useContext(ServicesContext);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  async function handleLoginPress() {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    dispatch(userActions.doSetUserActionInProgress());
      const login = await userService.loginUser({
        email: userEmail,
        password: userPassword,
      });
      if (login) {
        dispatch(userActions.doSetUser(login));
        if (login.user.completed_setup){
          navigation.navigate('Home')
        }
        else {
          navigation.navigate('SetupScreen');
        }
      }
      else {
        alert('Incorrect email or password.');
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
        <KeyboardAvoidingView enabled>
          <Text style={styles.header}>Email</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.header}>Password</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <GlucoseScreenButton
            buttonText="Login"
            onPress={() => handleLoginPress()}
          />
          <GlucoseScreenButton
            buttonText="Create New User"
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
