import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  useEffect(() => {
    if (navigation.canGoBack() === true) {
      setShowBackButton(true);
    }
  }, []);

  return (
    <LinearGradient colors={['#21A1FD', '#15639C']} style={styles.container}>
      <View style={styles.sectionStart}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.sectionStart}>
            <Icon name="chevron-left" color="white" size={30} />
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sectionMiddle}>
        <Text style={styles.title}>D2MP</Text>
      </View>
      <View style={styles.sectionEnd}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.sectionEnd}>
          <Icon name="account-cog-outline" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;
