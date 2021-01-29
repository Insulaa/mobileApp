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
  inputContainer: {
    width: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },
  numberInput: {
    borderBottomWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 120,
    fontSize: 40,
    textAlign: 'center',
  },
  unitInputContainer: {
    width: 120,
    height: 60,
    alignSelf: 'flex-end',
    padding: 10,
  },
  unitInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
});
