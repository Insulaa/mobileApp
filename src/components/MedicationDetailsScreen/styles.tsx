import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    color: '#fff',
    marginTop: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderWidth: 0.5,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 10,
    marginTop: 5,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 8,
  },
  heading: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    width: 70,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    width: 246,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  image: {
    zIndex: 10,
    width: 160,
    height: 140,
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#21A1FD',
    overflow: 'hidden',
  },
});
