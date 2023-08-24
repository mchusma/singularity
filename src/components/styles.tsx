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
    paddingBottom: 10,
  },
});

function getRandomLightColor() {
  const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}