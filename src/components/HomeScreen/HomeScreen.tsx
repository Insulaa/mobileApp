import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StatusBar, PermissionsAndroid, Alert} from 'react-native';
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
import RNFetchBlob from 'rn-fetch-blob';

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

  const {
    userInfo,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useSelector((state: RootState) => state.userProfileStore);

  const patientId = userData.user.patient_id;

  useEffect(() => {
    dispatch(
      glucoseActions.doFetchGlucoseReadingsAsync({patientId, glucoseService}),
    );
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
    const apiUrl = `http://10.0.2.2:8000/views/FourteenDayAvg/?patient_id=${patientId}`;
    axios
      .get<GlucoseLevelOnly[]>(apiUrl)
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

  const getPDF = () => {
    const {dirs} = RNFetchBlob.fs;
    const apiUrl = `http://10.0.2.2:8000/views/FetchReport/download?patient_id=${patientId}`;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `patientReportSummary.pdf`,
        path: `${dirs.DownloadDir}/patientReportSummary.pdf`,
      },
    })
      .fetch('GET', apiUrl, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const exportPatientSummary = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getPDF();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
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

  const calculateColor = (glucoseLevel: number) => {
    var borderColor = '';
    if (glucoseLevel === undefined) {
      borderColor = 'blue';
    } else {
      if (glucoseLevel > 13.9 || glucoseLevel < 3) {
        borderColor = '#C20114';
      } else if (
        userInfo.glucose_lower_limit <= glucoseLevel &&
        glucoseLevel <= userInfo.glucose_upper_limit
      ) {
        borderColor = '#75E4B3';
      } else {
        borderColor = '#C6F91F';
      }
    }
    return borderColor;
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
                borderColor={calculateColor(
                  glucoseReadings[glucoseReadings.length - 3][
                    'glucose_reading'
                  ],
                )}
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
                borderColor={calculateColor(
                  glucoseReadings[glucoseReadings.length - 2][
                    'glucose_reading'
                  ],
                )}
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
                borderColor={calculateColor(
                  glucoseReadings[glucoseReadings.length - 1][
                    'glucose_reading'
                  ],
                )}
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
          borderColor={calculateColor(fourteenDayAverage)}
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
        <GlucoseScreenButton
          buttonText="EXPORT DATA"
          onPress={exportPatientSummary}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default HomeScreen;
