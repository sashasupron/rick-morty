import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'rgba(99, 255, 71, 0.8)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80, 
    borderRadius: 50,
  },
  name: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 7,
    marginLeft: 20,
    fontSize: 18,
  },
  filters: {
    backgroundColor: 'rgba(170, 8, 199, 0.8)',
    padding: 15, 
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 20,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    backgroundColor: 'rgba(99, 255, 71, 0.8)',
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 20,
    paddingVertical: 10, 
    paddingHorizontal: 30,
  },
  descDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  imageDetails: {
    width: 200,
    height: 200, 
    borderRadius: 100,
  },
});