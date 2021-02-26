import React from 'react';
import styles from './styles';
import {View, Text} from 'react-native';

type ReadingIconProps = {
  glucoseReading: number;
  units: string;
  time: string;
}

const GlucoseReadingIcon = (reading: ReadingIconProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.numberText}>{reading.glucoseReading}</Text>
          <Text style={styles.unitText}>{reading.units}</Text>
        </View>
        <Text style={styles.timeText}>{reading.time}</Text>
      </View>
    </View>
  );
};

export default GlucoseReadingIcon;
