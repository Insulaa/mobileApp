import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import HomeButton from '../Buttons/HomeButton';
import {useState} from 'react';
import SkipButton from '../Buttons/SkipButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import ServicesContext from '../../servicesContext';
import {useDispatch} from 'react-redux';
import {actions as glucoseActions} from '../../redux/glucoseStore';

const GlucoseInputScreen = () => {
  const dispatch = useDispatch();
  const {glucoseService} = useContext(ServicesContext);

  const patientId = 2;

  let [glucoseLevel, setGlucoseLevel] = useState(0);
  let [glucoseUnit, setGlucoseUnit] = useState('mg');
  const navigation = useNavigation();

  const onSubmitButtonPress = () => {
    dispatch(
      glucoseActions.doAddGlucoseReadingAsync({
        patientId,
        glucoseLevel,
        glucoseService,
      }),
    );
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your {'\n'}Glucose Reading!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          onChangeText={(val) => setGlucoseLevel(val)}
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
      <SkipButton />
      <HomeButton onPress={onSubmitButtonPress} />
    </View>
  );
};

export default GlucoseInputScreen;
