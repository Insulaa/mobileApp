import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const HomeButton = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.smallerContainer}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}
          style={styles.mainButton}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default HomeButton;
