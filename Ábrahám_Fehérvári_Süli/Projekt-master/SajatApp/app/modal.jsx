import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quarter Fitness Info</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>
          Ez az applikáció a Quarter Fitness tagjai számára készült, 
          hogy minden fontos információt egy helyen érjenek el.
        </Text>
        <Text style={styles.subText}>Verzió: 1.0.0</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.back()} // Bezárja a modalt
      >
        <Text style={styles.buttonText}>Bezárás</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5c542',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 22,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f5c542',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});