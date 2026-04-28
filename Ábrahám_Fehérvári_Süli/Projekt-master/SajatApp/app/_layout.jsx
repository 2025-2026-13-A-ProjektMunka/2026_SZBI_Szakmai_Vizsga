import { Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo ikonok

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111',
        },
        headerTintColor: '#da9705',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Itt definiáljuk a saját fejlécünket, ami hasonlít a webes Navbarra
        headerTitle: () => (
          <Text style={styles.logoText}>💪 GYMPOWER 💪</Text>
        ),
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.push('/userProfile')}>
              <Ionicons name="person-circle-outline" size={30} color="#da9705" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => {/* Itt nyílhatna egy menü */}}>
            <Ionicons name="menu" size={30} color="#da9705" />
          </TouchableOpacity>
        ),
      }}
    >
      {/* Az útvonalak automatikusan jönnek a fájlrendszerből */}
      <Stack.Screen name="home" options={{ title: 'Főoldal' }} />
      <Stack.Screen name="about" options={{ title: 'Rólunk' }} />
      <Stack.Screen name="gym" options={{ title: 'Terem' }} />
      <Stack.Screen name="trainers" options={{ title: 'Edzők' }} />
      <Stack.Screen name="rules" options={{ title: 'Szabályzat' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  }
});