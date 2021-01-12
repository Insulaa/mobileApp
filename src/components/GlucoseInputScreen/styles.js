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
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  body: {
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#FBF6F6',
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
  clickableText: {
    color: '#21A1FD',
    fontSize: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 120,
    alignSelf: 'center',
    fontSize: 40,
  },
});
