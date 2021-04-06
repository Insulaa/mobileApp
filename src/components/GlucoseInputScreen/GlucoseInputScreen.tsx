import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import MainButton from '../Buttons/MainButton';
import {useState} from 'react';
import ClickableTextButton from '../Buttons/ClickableTextButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import ServicesContext from '../../servicesContext';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';
import {actions as glucoseActions} from '../../redux/glucoseStore';
import DismissKeyboard from '../Util/DismissKeyboard';

const GlucoseInputScreen = () => {
  const dispatch = useDispatch();
  const {glucoseService} = useContext(ServicesContext);

  const {glucoseEditInfo} = useSelector(
    (state: RootState) => state.glucoseStore,
  );

  const patientId = 2;

  let [glucoseLevel, setGlucoseLevel] = useState(0);
  let [glucoseUnit, setGlucoseUnit] = useState('mmol');
  const navigation = useNavigation();

  const onSubmitButtonPress = () => {
    if (glucoseEditInfo.isEdit) {
      const readingId = glucoseEditInfo.glucoseReadingId;
      dispatch(
        glucoseActions.doUpdateGlucoseReadingAsync({
          patientId,
          glucoseLevel,
          readingId,
          glucoseService,
        }),
      );
    } else {
      dispatch(
        glucoseActions.doAddGlucoseReadingAsync({
          patientId,
          glucoseLevel,
          glucoseService,
        }),
      );
    }
    navigation.navigate('Home');
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your {'\n'}Glucose Reading!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.numberInput}
            onChangeText={(val) => setGlucoseLevel(Number(val))}
            keyboardType="numeric"
          />
          <DropDownPicker
            items={[
              {
                label: 'mg/dL',
                value: 'mg',
              },
              {
                label: 'mmol/L',
                value: 'mmol',
              },
            ]}
            defaultValue={glucoseUnit}
            style={styles.unitInput}
            labelStyle={{
              fontSize: 16,
              textAlign: 'left',
              color: '#000',
            }}
            activeLabelStyle={{fontWeight: 'bold'}}
            containerStyle={styles.unitInputContainer}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => setGlucoseUnit(item.value)}
          />
        </View>
        <View style={{marginTop: 60}}>
          <ClickableTextButton
            text="Skip For Now"
            onPress={() => navigation.navigate('Home')}
            textSize={20}
          />
        </View>
        <View style={{marginTop: 40}}>
          <MainButton onPress={onSubmitButtonPress} text="SUBMIT" />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default GlucoseInputScreen;
