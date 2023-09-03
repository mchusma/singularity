import { StyleSheet, Platform, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '1%'
  },
  boldText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '1%'
  },
  header: {
    backgroundColor: '#3F51B5',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unitWrapper: {
    borderColor: "#FFADAD",
    borderWidth: 1,
    padding: '1%',
    margin: '2%',
    flex: 1
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4681f4',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    paddingTop: 5,
  },
  resourceWrapper: {
    borderColor: "#FFADAD",
    borderWidth: 1,
    padding: 5
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  dotPlaceholder: {
    width: 10,
    height: 10,
    borderRadius: 5, 
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
});
