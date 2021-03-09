import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MedicationScreenButtonProps = {
  iconName?: string;
  onPress?: React.MouseEventHandler<any>;
};

const MedicationScreenButton = (props: MedicationScreenButtonProps) => {
  return (
    <View style={styles.iconContainer}>
          <TouchableOpacity onPress={props.onPress}>
            <Icon name="plus-thick" color="white" size={60} />
          </TouchableOpacity>
    </View>
  );
};
export default MedicationScreenButton;
