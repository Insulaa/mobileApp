import React from 'react';
import styles from './styles';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'react-moment';

type ReadingIconProps = {
  isEmpty: boolean;
  glucoseReading?: number;
  units?: string;
  time?: string;
  onPress?: () => void;
};

const GlucoseReadingIcon = (reading: ReadingIconProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {reading.isEmpty && (
          <>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={reading.onPress}>
                <Icon name="plus-thick" color="#21A1FD" size={60} />
              </TouchableOpacity>
            </View>
            <Text style={styles.timeText}> </Text>
          </>
        )}
        {!reading.isEmpty && (
          <>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={reading.onPress}>
                <Text style={styles.numberText}>{reading.glucoseReading}</Text>
                <Text style={styles.unitText}>{reading.units}</Text>
              </TouchableOpacity>
            </View>
            {reading.time && (
              <Moment
                element={Text}
                style={styles.timeText}
                format="h:mm A"
                parse="HH:mm:ss">
                {reading.time}
              </Moment>
            )}
            {!reading.time && <Text></Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default GlucoseReadingIcon;
