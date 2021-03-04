import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import styles from './styles';
import GlucoseScreenButton from '../Buttons/GlucoseScreenButton';
import GlucoseReadingIcon from '../GlucoseReadingIcon/GlucoseReadingIcon';
import {
  UserGlucoseReadings,
  GlucoseReading,
  GlucoseLevelOnly,
  AllGlucoseLevelsOnly,
} from '../../api/interfaces';
import {RootState} from '../../redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {actions as glucoseActions} from '../../redux/glucoseStore';
import ServicesContext from '../../servicesContext';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {glucoseService} = useContext(ServicesContext);
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

  const [numberOfReadings, setNumberOfReadings] = useState<number>(0);

  const [
    fourteenDayReadings,
    setFourteenDayReadings,
  ] = useState<AllGlucoseLevelsOnly>({
    glucoseLevels: [],
    isLoading: true,
    error: null,
  });
  const [fourteenDayAverage, setFourteenDayAverage] = useState<number>(0);

  const getFourteenDayReadings = () => {
    axios
      .get<GlucoseLevelOnly[]>(
        'http://10.0.2.2:8000/FourteenDayAvg/?patient_id=1',
      )
      .then((response: AxiosResponse) => {
        setFourteenDayReadings({
          glucoseLevels: response.data,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        setFourteenDayReadings({
          glucoseLevels: [],
          isLoading: false,
          error: err,
        });
        console.log(err);
      });
  };

  const calculateFourteenDayAverage = ({
    glucoseLevels,
  }: {
    glucoseLevels: GlucoseLevelOnly[];
  }) => {
    var glucoseSum = 0;
    glucoseLevels.map((reading) => {
      glucoseSum += reading.glucose_reading;
    });
    const average = (glucoseSum / glucoseLevels.length).toFixed(1);
    setFourteenDayAverage(Number(average));
  };

  useEffect(() => {
    getFourteenDayReadings();
  }, []);

  useEffect(() => {
    calculateFourteenDayAverage(fourteenDayReadings);
  }, [fourteenDayReadings]);

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
              />
            )}
            {glucoseReadings.length < 3 && (
              <GlucoseReadingIcon isEmpty={true} />
            )}
          </>
        )}
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon
          isEmpty={false}
          glucoseReading={fourteenDayAverage}
          units="mg/dL"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <GlucoseScreenButton buttonText="ADD READING" />
        <GlucoseScreenButton buttonText="EXPORT DATA" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default HomeScreen;
