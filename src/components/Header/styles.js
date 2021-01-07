import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 8,
    paddingBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#FFF9FB',
    textAlign: 'center',
  },
});
