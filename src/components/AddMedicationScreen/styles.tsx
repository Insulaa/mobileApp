import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    color: '#fff',
    marginTop: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderWidth: 0.5,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 8,
  },
  heading: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    marginBottom: 0,
  },
  calendarHeading: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 0,
    marginBottom: 0,
  },
  calendarButton: {
    borderBottomWidth: 1,
    width: 150,
    height: 30,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 40,
  },
  dateInputContainer: {
    width: 240,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 30,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#777',
    width: 180,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    marginLeft: 2,
    paddingBottom: 0,
  },
  medicationInputContainer: {
    width: 315,
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 10,
  },
  dropdownInputContainer: {
    width: 120,
    height: 50,
    alignSelf: 'flex-end',
    padding: 8,
    paddingLeft: 0,
    marginLeft: 20,
  },
  freqInputContainer: {
    width: 190,
    height: 50,
    alignSelf: 'flex-end',
    padding: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },
  dropDownInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#777',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  datePickerStyle: {
    width: 150,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  checkbox: {
    marginLeft: 35,
    marginTop: 10,
    marginBottom: 0,
  },
  checkboxText: {
    fontSize: 16,
  },
});