import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions 
} from 'react-native';

// Lekérjük a képernyő szélességét a reszponzivitáshoz
const { width } = Dimensions.get('window');

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HERO SZEKCIÓ - Háttérképpel és sötétítéssel */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80' }} 
          style={styles.hero}
        >
          <View style={styles.overlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Quarter Fitness</Text>
              <Text style={styles.heroSubtitle}>
                A modern edzőterem, ahol a személyi edzés nemcsak hatékony, hanem élmény is.
              </Text>
              <TouchableOpacity 
                style={styles.btnPrimary}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Fedezd fel az edzéseket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* RÓLUNK SZEKCIÓ */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Miért válaszd a Quarter Fitness-t?</Text>
          <View style={styles.yellowBar} />
          <Text style={styles.sectionText}>
            A Quarter Fitness a legújabb fitnesztechnológiákkal és modern felszereltséggel vár mindenkit,
            aki fejlődni szeretne. Személyi edzőink segítenek elérni a céljaidat.
          </Text>
        </View>

        {/* SZOLGÁLTATÁSOK - Kártyák */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Személyi edzések</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Egyéni edzések</Text>
            <Text style={styles.cardDescription}>
              Teljesen rád szabott edzéstervek, hogy minden mozdulat közelebb vigyen a céljaidhoz.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kiscsoportos tréningek</Text>
            <Text style={styles.cardDescription}>
              Motiváló hangulat, szakértői irányítás és közösségi élmény egyszerre.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Funkcionális edzés</Text>
            <Text style={styles.cardDescription}>
              Modern eszközök, változatos gyakorlatok – hogy a tested minden izma dolgozzon.
            </Text>
          </View>
        </View>

        {/* FELSZERELTSÉG */}
        <View style={styles.equipmentSection}>
          <Text style={styles.sectionTitle}>Modern felszereltség</Text>
          <Text style={styles.sectionText}>
            Edzőtermünkben a legújabb gépek, súlyzók és funkcionális edzőeszközök állnak rendelkezésedre. 
            A higiénia és a hatékonyság nálunk alapvetés.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// STÍLUSOK
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111', // Teljes sötét háttér
  },
  container: {
    flex: 1,
  },
  /* Hero */
  hero: {
    height: 500,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Kép sötétítése
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f5c542', // Quarter sárga
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  btnPrimary: {
    backgroundColor: '#f5c542',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5, // Android árnyék
    shadowColor: '#000', // iOS árnyék
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnText: {
    color: '#020202',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  /* Általános Szekció Stílusok */
  aboutSection: {
    padding: 40,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#f5c542',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  yellowBar: {
    width: 50,
    height: 3,
    backgroundColor: '#f5c542',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 25,
  },
  /* Kártyák */
  servicesSection: {
    padding: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 20,
    color: '#f5c542',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  equipmentSection: {
    padding: 40,
    backgroundColor: '#1a1a1a',
    marginBottom: 50,
  }
});

export default Home;