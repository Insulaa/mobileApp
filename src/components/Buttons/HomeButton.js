import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const HomeButton = ({
  buttonText,
  onPress,
}: {
  buttonText: String,
  onPress: React.MouseEventHandler<any>,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={['#1D6EA8', '#21A1FD']} style={styles.mainButton}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);
export default HomeButton;
