import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const GlucoseScreenButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('GlucoseInput')}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}
          style={styles.mainButton}>
          <Text style={styles.buttonText}>ADD READING</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default GlucoseScreenButton;
