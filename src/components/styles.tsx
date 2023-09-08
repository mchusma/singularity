import { StyleSheet, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  boldText: {
    color: '#fff',
    fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 5,
      marginTop: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4681f4',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    paddingTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#000000',
    flex: 1,
    padding: 10,
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: '#AAAAAA',
    borderRadius: 4,
    marginTop: 10,
    padding: 10,
  },
  dot: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 10,
    marginHorizontal: 10,
    width: 10,
  },
  dotPlaceholder: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    height: 10,
    marginHorizontal: 10,
    width: 10,
  },
  logContainer: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  resourceWrapper: {
    borderColor: "#FFADAD",
    borderWidth: 1,
    padding: 5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
  },
  unitWrapper: {
    borderColor: 'rgb(132, 153, 164)',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    margin: '0%',
    padding: '0%',
  },
});
