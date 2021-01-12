import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions, useNavigation} from '@react-navigation/native';
import HomeButton from '../Buttons/HomeButton';
import {useState} from 'react';
import SkipButton from '../Buttons/SkipButton';

const GlucoseInputScreen = () => {
  const navigation = useNavigation();
  let [glucoseLevel, setGlucoseLevel] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your {'\n'}Glucose Reading!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setGlucoseLevel(val)}
        keyboardType="numeric"
      />
      <SkipButton />
      <HomeButton />
    </View>
  );
};

export default GlucoseInputScreen;
