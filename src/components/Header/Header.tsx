import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Header = () => {
  return (
    <LinearGradient colors={['#21A1FD', '#15639C']} style={styles.container}>
      <Text style={styles.title}>D2MP</Text>
    </LinearGradient>
  );
};

export default Header;
