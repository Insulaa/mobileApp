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
    marginBottom: 8,
  },
});
