import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
import {GlucoseLevelOnly, AllGlucoseLevelsOnly} from '../../api/interfaces';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {
  actions as glucoseActions,
  GlucoseEditInfo,
} from '../../redux/glucoseStore';
import ServicesContext from '../../servicesContext';
import {useNavigation} from '@react-navigation/native';

const BloodPressureScreen = () => {
  const dispatch = useDispatch();
  const {glucoseService} = useContext(ServicesContext);
  const navigation = useNavigation();

  const {
    readings: glucoseReadings,
    isLoading: isGlucoseDataLoading,
    error: glucoseFetchError,
  } = useSelector((state: RootState) => state.glucoseStore);

  const patientId = 1;

  useEffect(() => {
    dispatch(
      glucoseActions.doFetchGlucoseReadingsAsync({patientId, glucoseService}),
    );
  }, []);

  const handleIconButtonPress = (glucoseEditInfo: GlucoseEditInfo) => {
    dispatch(glucoseActions.doSetGlucoseInputStatusAsync({glucoseEditInfo}));
    navigation.navigate('BloodPressureInput');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glucose Levels</Text>
      <Text style={styles.body}>Todays Readings</Text>
      <View style={styles.glucoseReadingsContainer}>
        {!isGlucoseDataLoading && glucoseFetchError === null && (
          <>
            {glucoseReadings.length > 2 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings[glucoseReadings.length - 3]['glucose_reading']
                }
                units="mg/dL"
                time={glucoseReadings[glucoseReadings.length - 3]['timestamp']}
                onPress={() =>
                  handleIconButtonPress({
                    isEdit: true,
                    glucoseReadingId:
                      glucoseReadings[glucoseReadings.length - 3]['id'],
                  })
                }
              />
            )}
            {glucoseReadings.length > 1 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings[glucoseReadings.length - 2]['glucose_reading']
                }
                units="mg/dL"
                time={glucoseReadings[glucoseReadings.length - 2]['timestamp']}
                onPress={() =>
                  handleIconButtonPress({
                    isEdit: true,
                    glucoseReadingId:
                      glucoseReadings[glucoseReadings.length - 2]['id'],
                  })
                }
              />
            )}
            {glucoseReadings.length > 0 && (
              <GlucoseReadingIcon
                isEmpty={false}
                glucoseReading={
                  glucoseReadings[glucoseReadings.length - 1]['glucose_reading']
                }
                units="mg/dL"
                time={glucoseReadings[glucoseReadings.length - 1]['timestamp']}
                onPress={() =>
                  handleIconButtonPress({
                    isEdit: true,
                    glucoseReadingId:
                      glucoseReadings[glucoseReadings.length - 1]['id'],
                  })
                }
              />
            )}
          </>
        )}
      </View>
      <Text style={styles.body}>Add</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon
          isEmpty={true}
          onPress={() =>
            handleIconButtonPress({
              isEdit: false,
              glucoseReadingId: -1,
            })
          }
        />
      </View>
      <View style={styles.buttonsContainer}>
        <GlucoseScreenButton
          buttonText="ADD READING"
          onPress={() =>
            handleIconButtonPress({
              isEdit: false,
              glucoseReadingId: -1,
            })
          }
        />
        <GlucoseScreenButton buttonText="EXPORT DATA" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default BloodPressureScreen;
