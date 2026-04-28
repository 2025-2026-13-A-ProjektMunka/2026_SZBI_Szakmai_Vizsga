import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  ImageBackground, 
  SafeAreaView,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const Gym = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HERO SZEKCIÓ */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80' }} 
          style={styles.hero}
        >
          <View style={styles.overlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>A Quarter Fitness edzőterem</Text>
              <Text style={styles.heroSubtitle}>
                Modern felszereltség, prémium gépek és motiváló környezet – minden adott ahhoz, hogy kihozd magadból a maximumot.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Áttekintés */}
        <View style={styles.introSection}>
          <Text style={styles.sectionTitle}>850 m2 tiszta energia</Text>
          <Text style={styles.sectionText}>
            A Quarter Fitness egy 850 négyzetméteres, tágas és világos edzőterem Budapesten, 
            ahol a legmodernebb Technogym, Life Fitness és Hammer Strength gépek várják a vendégeket.
          </Text>
        </View>

        {/* Gépek és zónák */}
        <View style={styles.zonesSection}>
          <Text style={styles.sectionTitle}>Főbb edzészónáink</Text>

          {/* Zóna kártyák */}
          <View style={styles.zoneCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2e3df4?auto=format&fit=crop&w=1600&q=80' }}
              style={styles.zoneImg}
            />
            <Text style={styles.zoneTitle}>Súlyzós edzés zóna</Text>
            <Text style={styles.zoneText}>
              Több mint 30 különböző súlyzós gép és 4 sor szabad súly (1,25–50 kg között). 
              Smith-keret, fekvenyomó padok és Hammer Strength állomások.
            </Text>
          </View>

          <View style={styles.zoneCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80' }}
              style={styles.zoneImg}
            />
            <Text style={styles.zoneTitle}>Kardió részleg</Text>
            <Text style={styles.zoneText}>
              20+ Technogym és Life Fitness futópad, ellipszis tréner, lépcsőző és szobakerékpár digitális kijelzővel.
            </Text>
          </View>

          <View style={styles.zoneCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80' }}
              style={styles.zoneImg}
            />
            <Text style={styles.zoneTitle}>Funkcionális edzőtér</Text>
            <Text style={styles.zoneText}>
              TRX, kettlebell, battle rope, medicinlabda és egy nagyméretű funkcionális ketrec a Cross training szerelmeseinek.
            </Text>
          </View>

          <View style={styles.zoneCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1600&q=80' }}
              style={styles.zoneImg}
            />
            <Text style={styles.zoneTitle}>Wellness részleg</Text>
            <Text style={styles.zoneText}>
              Edzés után lazíthatsz az infra- és finn szaunában, valamint a pihenőzónában. Teljesen klimatizált terület.
            </Text>
          </View>
        </View>

        {/* Összegzés */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Felszereltség röviden</Text>
          <View style={styles.summaryList}>
            <Text style={styles.listItem}>✅ 30+ professzionális súlyzós gép</Text>
            <Text style={styles.listItem}>✅ 20+ kardió gép</Text>
            <Text style={styles.listItem}>✅ Funkcionális rész (TRX, Kettlebell)</Text>
            <Text style={styles.listItem}>✅ Csoportos edzőterem és szauna</Text>
            <Text style={styles.listItem}>✅ Modern öltözők és zuhanyzók</Text>
          </View>
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
    height: 400,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f5c542',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },
  /* Szekciók */
  introSection: {
    padding: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#f5c542',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  /* Zónák */
  zonesSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  zoneCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  zoneImg: {
    width: '100%',
    height: 200,
  },
  zoneTitle: {
    fontSize: 18,
    color: '#f5c542',
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 5,
  },
  zoneText: {
    fontSize: 14,
    color: '#bbb',
    paddingHorizontal: 15,
    paddingBottom: 20,
    lineHeight: 20,
  },
  /* Összegzés */
  summarySection: {
    padding: 40,
    backgroundColor: '#0c0c0c',
  },
  summaryList: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  listItem: {
    color: '#f5f5f5',
    fontSize: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  }
});

export default Gym;