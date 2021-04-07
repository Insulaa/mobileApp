import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import axios, {AxiosResponse} from 'axios';
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {glucoseService} = useContext(ServicesContext);
  const navigation = useNavigation();

  const {
    readings: glucoseReadings,
    isLoading: isGlucoseDataLoading,
    error: glucoseFetchError,
  } = useSelector((state: RootState) => state.glucoseStore);

  const {
    userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useSelector((state: RootState) => state.userStore);
  const patientId = userData.user.patient_id;

  useEffect(() => {
    dispatch(
      glucoseActions.doFetchGlucoseReadingsAsync({patientId, glucoseService}),
    );
    console.log(userData);
  }, []);

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
    const apiUrl = `http://10.0.2.2:8000/views/FourteenDayAvg/?patient_id=${patientId}`
    console.log(apiUrl)
    axios
      .get<GlucoseLevelOnly[]>(
        apiUrl,
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
  }, [glucoseReadings]);

  useEffect(() => {
    calculateFourteenDayAverage(fourteenDayReadings);
  }, [fourteenDayReadings]);

  const handleIconButtonPress = (glucoseEditInfo: GlucoseEditInfo) => {
    dispatch(glucoseActions.doSetGlucoseInputStatusAsync({glucoseEditInfo}));
    navigation.navigate('GlucoseInput');
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
                units="mmol/L"
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
                units="mmol/L"
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
                units={'mmol/L'}
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
            {glucoseReadings.length < 3 && (
              <GlucoseReadingIcon
                isEmpty={true}
                onPress={() =>
                  handleIconButtonPress({
                    isEdit: false,
                    glucoseReadingId: -1,
                  })
                }
              />
            )}
          </>
        )}
      </View>
      <Text style={styles.body}>14 Day Average</Text>
      <View style={styles.glucoseReadingsContainer}>
        <GlucoseReadingIcon
          isEmpty={false}
          glucoseReading={fourteenDayAverage}
          units="mmol/L"
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

export default HomeScreen;
