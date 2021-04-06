import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    color: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderWidth: 0.5,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  glucoseReadingsContainer: {
    flex: 2.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer: {
    flex: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: 60,
    flexDirection: 'column',
  },
  title: {
    flex: 1.5,
    top: 24,
    alignSelf: 'center',
    fontSize: 32,
    color: 'black',
  },
  body: {
    flex: 0.8,
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
});
