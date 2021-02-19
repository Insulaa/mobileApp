import React from 'react';
import styles from './styles';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const GlucoseReadingIcon = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.numberText}>{props.glucoseReading}</Text>
          <Text style={styles.unitText}>{props.unit}</Text>
        </View>
        <Text style={styles.timeText}> {props.time} </Text>
      </View>
    </View>
  );
};

GlucoseReadingIcon.propTypes = {
  glucoseReading: PropTypes.number,
  time: PropTypes.string,
  unit: PropTypes.string,
};

export default GlucoseReadingIcon;
