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
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: '#21A1FD',
      marginLeft: 40,
      marginRight: 40,
      width: 60,
      height: 60,
      borderRadius: 30,
  },
  medicationsContainer: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
  },
  medicationEntry: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
