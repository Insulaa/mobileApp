import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    color: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderWidth: 0.5,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    top: 15,
    alignSelf: 'center',
    fontSize: 32,
    color: 'black',
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 25,
    marginBottom: 30,
  },
  internalContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 0,
    marginTop: 10,
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#777',
    width: 160,
    fontSize: 16,
    textAlign: 'center',
  },
  smallInput: {
    borderBottomWidth: 1,
    borderColor: '#777',
    width: 80,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 20,
  },
  dropdownInputContainer: {
    width: 110,
    alignSelf: 'flex-start',
  },
  dropDownInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
  },
  heading: {
    fontSize: 22,
    marginLeft: 20,
  },
});
