import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      width: 300,
      padding: 10,
      alignSelf: 'center',
      borderRadius: 10,
      marginTop: 20,
    },
    buttonTextStyle: {
      fontSize: 28,
      color: 'white',
      textAlign: 'center',
      borderRadius: 10,
    },
    header: {
      color: '#FFFFFF',
      textAlign: 'left',
      flex: 0.8,
      fontSize: 14,
      marginTop: 10,
      marginLeft: 45,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    registerTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });