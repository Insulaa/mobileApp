import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const GlucoseScreenButton = ({buttonText}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('GlucoseInput')} style={styles.mainButton}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default GlucoseScreenButton;
