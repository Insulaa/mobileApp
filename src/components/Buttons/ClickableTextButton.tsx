import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

interface ClickableTextProps {
  onPress: () => void;
  text: string;
  textSize: number;
}

function ClickableText(props: ClickableTextProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.clickableTextButton}>
      <Text style={[styles.clickableText, {fontSize: props.textSize}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
export default ClickableText;
