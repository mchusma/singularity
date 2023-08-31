import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5
  },
  header: {
    backgroundColor: '#3F51B5',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unitWrapper: {
    borderColor: getRandomLightColor(),
    borderWidth: 1,
    padding: 5
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
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
    color: '#FFFFFF',
  },
  resourceWrapper: {
    borderColor: getRandomLightColor(),
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

function getRandomLightColor() {
  const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}