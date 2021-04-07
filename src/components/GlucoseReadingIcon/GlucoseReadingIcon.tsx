import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'react-moment';
import {actions as userProfileActions} from '../../redux/userProfileStore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import ServicesContext from '../../servicesContext';

type ReadingIconProps = {
  isEmpty: boolean;
  glucoseReading?: number;
  units?: string;
  time?: string;
  onPress?: () => void;
};

const GlucoseReadingIcon = (reading: ReadingIconProps) => {
  const dispatch = useDispatch();
  const {userProfileService} = useContext(ServicesContext);
  const [borderColor, setBorderColor] = useState<string>('');

  const {
    userInfo,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useSelector((state: RootState) => state.userProfileStore);

  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);

  const patientId = userData.user.patient_id;

  useEffect(() => {
    dispatch(
      userProfileActions.doFetchUserProfileAsync({
        patientId,
        userProfileService,
      }),
    );
    {
      calculateColor(reading.glucoseReading);
    }
  }, []);

  const calculateColor = (glucoseLevel: number | undefined) => {
    if (glucoseLevel === undefined) {
      setBorderColor('blue');
    } else {
      if (glucoseLevel > 13.9 || glucoseLevel < 3) {
        setBorderColor('#C20114');
      } else if (
        userInfo.glucose_lower_limit < glucoseLevel &&
        glucoseLevel < userInfo.glucose_upper_limit
      ) {
        setBorderColor('#75E4B3');
      } else {
        setBorderColor('#C6F91F');
      }
    }
  };

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
        {!reading.isEmpty && !userProfileLoading && userProfileError === null && (
          <>
            <View style={[styles.iconContainer, {borderColor: borderColor}]}>
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
