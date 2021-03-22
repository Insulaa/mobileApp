import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionStart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionMiddle: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'normal',
    color: '#FFF9FB',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 2,
  },
});
