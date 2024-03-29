import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: '#FBF6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#fff',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
    alignSelf: 'center',
    color: 'black',
    alignItems: 'center',
  },
  body: {
    fontSize: 20,
    alignSelf: 'center',
  },
  tab: {
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 6,
    fontSize: 14,
    backgroundColor: '#FBF6F6',
    flex: 1,
    alignItems: 'center',
    borderStyle: 'solid',
    borderRightWidth: 0.5,
  },
  mainButton: {
    width: 320,
    padding: 10,
    marginTop: 60,
    alignSelf: 'center',
    borderRadius: 10,
  },
  skipButton: {
    padding: 2,
    marginTop: 60,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
});
