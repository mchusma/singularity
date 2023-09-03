import { StyleSheet, Platform, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  boldText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '2%',
    marginLeft: '1%',
    marginTop: '2%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4681f4',
    borderRadius: 4,
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
  header: {
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    padding: '3%',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logContainer: {
    alignSelf: 'flex-start',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingBottom: 5,
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
    marginBottom: '2%',
    marginLeft: '1%',
    marginTop: '2%',
  },
  unitWrapper: {
    borderColor: "#FFADAD",
    borderWidth: 1,
    flex: 1,
    margin: '2%',
    padding: '1%',
  },
});
