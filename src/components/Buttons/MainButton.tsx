import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

interface MainButtonProps {
  onPress: () => void;
  text: string;
}

const MainButton = (props: MainButtonProps) => {
  return (
    <View style={styles.smallerContainer}>
      <TouchableOpacity onPress={props.onPress}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}
          style={styles.mainButton}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default MainButton;
