import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
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
    borderColor: '#21A1FD',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 26,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18,
    marginTop: 10,
    overflow: 'visible',
  },
});
