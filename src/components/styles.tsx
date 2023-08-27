import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5
  },
  unitWrapper: {
    borderColor: getRandomLightColor(),
    borderWidth: 1,
    padding: 5
  },
  buttonContainer: {
    paddingBottom: 50,
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
  logWrapper: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

function getRandomLightColor() {
  const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}
