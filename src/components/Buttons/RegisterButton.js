import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const RegisterButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}
          style={styles.mainButton}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterButton;