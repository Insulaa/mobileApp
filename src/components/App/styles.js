import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: '#FBF6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#fff',
    flexDirection: 'row',
  },
  title: {
    fontSize: 36,
    alignSelf: 'center',
    color: 'black',
  },
  body: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    paddingTop: 14,
    paddingBottom: 4,
    fontSize: 14,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    borderStyle: 'solid',
    borderRightWidth: 0.5,
  },
  buttonText: {
    color: 'black',
  },
});
