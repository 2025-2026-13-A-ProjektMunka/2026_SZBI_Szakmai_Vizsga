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
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const edzoLeker = async () => {
      try {
        // FIGYELEM: Mobilon a localhost helyett a géped IP címét használd!
        const response = await fetch('http://localhost:3500/api/trainers-frontend');
        const adat = await response.json();
        if (response.ok) {
          setTrainers(adat.trainers);
        }
      } catch (error) {
        console.error("Hiba az edzők betöltésekor:", error);
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
        
        {/* HERO SZEKCIÓ */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' }} 
          style={styles.hero}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Szakértő Edzőink</Text>
            <Text style={styles.heroSubtitle}>Profi csapat a Te sikeredért</Text>
          </View>
        </ImageBackground>

        {/* INTRO SZÖVEG */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Válaszd ki a mentorodat</Text>
          <Text style={styles.introSubtitle}>Kattints a kártyákra a részletes bemutatkozásért és az órarendért.</Text>
        </View>

        {/* EDZŐ GRID */}
        {loading ? (
          <ActivityIndicator size="large" color="#a68a17" style={{ marginTop: 50 }} />
        ) : (
          <View style={styles.grid}>
            {trainers.map((t) => (
              <TouchableOpacity 
                key={t._id} 
                style={styles.card}
                onPress={() => goToTrainerPage(t._id)}
                activeOpacity={0.9}
              >
                {/* KÉP RÉSZ */}
                <View style={styles.imgWrap}>
                  <Image 
                    source={{ uri: t.kep || "https://placehold.co/400x500?text=Trainer" }} 
                    style={styles.trainerImg}
                  />
                  <View style={styles.cardOverlay}>
                    <View style={styles.overlayBtn}>
                      <Text style={styles.overlayBtnText}>Profil megtekintése</Text>
                    </View>
                  </View>
                </View>

                {/* TARTALOM RÉSZ */}
                <View style={styles.cardContent}>
                  <Text style={styles.trainerName}>{t.nev}</Text>
                  <Text style={styles.trainerBadge}>{t.specialization || "Személyi Edző"}</Text>
                  
                  <Text style={styles.ctaText}>
                    Kattints ide az edző részletes profiljának, tapasztalatainak és szabad időpontjainak megtekintéséhez.
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  container: {
    flex: 1,
  },
  /* Hero */
  hero: {
    height: 300,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#a68a17',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#a68a17',
    letterSpacing: 2,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 10,
    textAlign: 'center',
  },
  /* Intro */
  introContainer: {
    padding: 30,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
  },
  introSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  /* Grid & Card */
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#282828',
    marginBottom: 25,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imgWrap: {
    height: 350,
    width: '100%',
    position: 'relative',
  },
  trainerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(166, 138, 23, 0.2)', // Enyhe arany árnyalat a képen
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBtn: {
    backgroundColor: '#a68a17',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  overlayBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  trainerName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trainerBadge: {
    color: '#a68a17',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  ctaText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  }
});

export default Trainers;