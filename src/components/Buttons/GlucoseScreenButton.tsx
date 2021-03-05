import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

type GlucoseScreenButtonProps = {
  buttonText: string;
  onPress?: React.MouseEventHandler<any>;
};

const GlucoseScreenButton = (props: GlucoseScreenButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <LinearGradient
          colors={['#1D6EA8', '#21A1FD']}
          style={styles.mainButton}>
          <Text style={styles.buttonText}>{props.buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default GlucoseScreenButton;
