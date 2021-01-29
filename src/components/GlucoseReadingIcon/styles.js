import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#75E4B3',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 24,
  },
  unitText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
  },
  timeText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18,
    marginTop: 2,
  },
});
