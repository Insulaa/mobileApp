import React from 'react';
import styles from './styles';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'react-moment';

type ReadingIconProps = {
  isEmpty: boolean;
  systolicReading?: number;
  diastolicReading?: number;
  date?: string;
  onPress?: () => void;
};

const BloodPresureReadingIcon = (reading: ReadingIconProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {reading.isEmpty && (
          <>
            <TouchableOpacity onPress={reading.onPress}>
              <View style={styles.iconContainer}>
                <Icon name="plus-thick" color="#21A1FD" size={70} />
              </View>
            </TouchableOpacity>

            <Text style={styles.dateText}> </Text>
          </>
        )}
        {!reading.isEmpty && (
          <>
            <View style={styles.iconContainer}>
              <Text style={styles.numberText}>{reading.systolicReading}</Text>
              <Text style={styles.numberText}>{reading.diastolicReading}</Text>
            </View>
            {reading.date && (
              <Moment
                element={Text}
                date={reading.date}
                style={styles.dateText}
                format="MMM D, YYYY"
              />
            )}
            {!reading.date && <Text></Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default BloodPresureReadingIcon;
