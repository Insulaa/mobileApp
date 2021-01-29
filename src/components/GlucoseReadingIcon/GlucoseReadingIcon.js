import React from 'react';
import styles from './styles';
import {View, Text} from 'react-native';

const GlucoseReadingIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.numberText}>10.0</Text>
          <Text style={styles.unitText}>mg/dL</Text>
        </View>
        <Text style={styles.timeText}>12:20 AM</Text>
      </View>
    </View>
  );
};

export default GlucoseReadingIcon;
