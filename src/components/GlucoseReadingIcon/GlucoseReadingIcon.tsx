import React from 'react';
import styles from './styles';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Moment from 'react-moment';

type ReadingIconProps = {
  isEmpty: boolean;
  glucoseReading?: number;
  units?: string;
  time?: string;
};

const GlucoseReadingIcon = (reading: ReadingIconProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {reading.isEmpty && (
          <>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('GlucoseInput')}>
                <Icon name="plus-thick" color="#21A1FD" size={60} />
              </TouchableOpacity>
            </View>
            <Text style={styles.timeText}> </Text>
          </>
        )}
        {!reading.isEmpty && (
          <>
            <View style={styles.iconContainer}>
              <Text style={styles.numberText}>{reading.glucoseReading}</Text>
              <Text style={styles.unitText}>{reading.units}</Text>
            </View>
            <Moment
              element={Text}
              style={styles.timeText}
              format="h:mm A"
              parse="HH:mm:ss">
              {reading.time}
            </Moment>
          </>
        )}
      </View>
    </View>
  );
};

export default GlucoseReadingIcon;
