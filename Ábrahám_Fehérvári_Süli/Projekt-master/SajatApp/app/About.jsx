import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';

const About = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Tömb megkeverése
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const edzoLeker = async () => {
      try {
        // MEGJEGYZÉS: Mobilon a 'localhost' nem működik, a géped IP címét használd!
        // pl: 'http://192.168.1.10:3500/api/trainers-frontend'
        const response = await fetch('http://localhost:3500/api/trainers-frontend');
        const adat = await response.json();

        if (response.ok && adat.trainers) {
          const shuffled = shuffle([...adat.trainers]);
          setTrainers(shuffled.slice(0, 3));
        } else {
          console.error(adat.msg);
        }
      } catch (error) {
        console.error("Hiba az edzők lekérésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    edzoLeker();
  }, []);

  const goToTrainerPage = (trainerId) => {
    router.push(`/trainers/${trainerId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Hero szekció */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1600&q=80' }} 
          style={styles.hero}
        >
          <View style={styles.overlay}>
            <Text style={styles.heroTitle}>Rólunk</Text>
            <Text style={styles.heroSubtitle}>
              A Quarter Fitness több mint egy edzőterem – ez a hely, ahol célokat érünk el, és közösséget építünk.
            </Text>
          </View>
        </ImageBackground>

        {/* Bemutatkozás */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kik vagyunk?</Text>
          <Text style={styles.sectionText}>
            A Quarter Fitness 2022-ben nyitotta meg kapuit Budapesten, 850 m2-es területen.
            Célunk, hogy modern, inspiráló és barátságos környezetet biztosítsunk mindenkinek, aki fejlődni szeretne.
          </Text>
        </View>

        {/* Felszereltség */}
        <View style={[styles.section, styles.lightSection]}>
          <Text style={styles.sectionTitle}>Modern felszereltség</Text>
          <Text style={styles.sectionText}>
            Teremünkben megtalálhatóak a legújabb Technogym és Hammer Strength gépek, 
            funkcionális edzőrész és súlyzós zóna.
          </Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=80' }}
            style={styles.aboutImg}
          />
        </View>

        {/* Személyi edzők szekció */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Személyi edzőink</Text>
          <Text style={styles.sectionText}>
            Szakértő személyi edzőink minden vendéghez egyéni figyelemmel fordulnak.
          </Text>

          {loading ? (
            <ActivityIndicator color="#f5c542" size="large" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.trainerContainer}>
              {trainers.map((elem) => (
                <TouchableOpacity 
                  key={elem._id} 
                  style={styles.trainerCard}
                  onPress={() => goToTrainerPage(elem._id)}
                >
                  <Image 
                    source={{ uri: elem.kep || 'https://via.placeholder.com/300' }} 
                    style={styles.trainerImg}
                  />
                  <View style={styles.trainerInfo}>
                    <Text style={styles.trainerName}>{elem.nev}</Text>
                    <Text style={styles.clickHint}>Kattints a profil megtekintéséhez!</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Küldetés */}
        <View style={[styles.section, styles.lightSection, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Küldetésünk</Text>
          <Text style={styles.sectionText}>
            Célunk, hogy minden vendégünk megtalálja a számára megfelelő utat az egészséges életmódhoz. 
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
  },
  /* Hero */
  hero: {
    height: 350,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f5c542',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
    lineHeight: 22,
  },
  /* Szekciók */
  section: {
    padding: 30,
    alignItems: 'center',
  },
  lightSection: {
    backgroundColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5c542',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 15,
    color: '#f5f5f5',
    textAlign: 'center',
    lineHeight: 22,
  },
  aboutImg: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
  /* Edzők */
  trainerContainer: {
    width: '100%',
    marginTop: 20,
  },
  trainerCard: {
    backgroundColor: '#222',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  trainerImg: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  trainerInfo: {
    padding: 15,
    alignItems: 'center',
  },
  trainerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5c542',
  },
  clickHint: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  }
});

export default About;