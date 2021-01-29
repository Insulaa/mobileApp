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
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    top: 20,
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
  },
  body: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  mainButton: {
    width: 320,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
});
