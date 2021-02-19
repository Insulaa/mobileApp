import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

function SkipButton() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.skipButton}>
        <Text style={styles.clickableText}>Skip For Now</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SkipButton;
