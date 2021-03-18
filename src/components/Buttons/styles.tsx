import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 40,
    borderRadius: 10,
  },
  smallerContainer: {
    borderRadius: 0,
  },
  mainButton: {
    width: 300,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
  },
  clickableTextButton: {
    padding: 2,
    alignSelf: 'center',
  },
  clickableText: {
    color: '#21A1FD',
    textAlign: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
