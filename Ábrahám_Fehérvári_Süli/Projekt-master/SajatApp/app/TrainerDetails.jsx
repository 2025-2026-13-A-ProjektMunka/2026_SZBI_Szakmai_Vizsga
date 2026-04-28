import React, { useState, useEffect, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingModal from './Bookingmodal'; // Feltételezve, hogy a components-ben van

// Időpont generáló logika (maradt az eredeti logika, RN-re igazítva)
const generateAvailableTimes = (date, bookedTimes = []) => {
  const todayString = new Date().toISOString().split('T')[0];
  const now = new Date();

  if (!date || new Date(date) < new Date(todayString)) return [];
  
  const allTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  const timesBookedOnSelectedDate = bookedTimes
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  return allTimes.map((time) => {
    const [hour, minute] = time.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour, minute, 0, 0);

    const isPast = (date === todayString) && (slotDateTime < now);
    
    return {
      time: time,
      isBooked: timesBookedOnSelectedDate.includes(time) || isPast,
    };
  });
};

const TrainerDetails = () => {
  const { id } = useLocalSearchParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const getData = async () => {
      try {
        // User betöltése AsyncStorage-ból
        const userData = await AsyncStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));

        // Trainer adatok lekérése (Cseréld le az IP-t!)
        const response = await fetch(`http://YOUR_IP_ADDRESS:3500/api/trainers/${id}`);
        const adat = await response.json();

        if (response.ok) {
          let convertedBooked = [];
          if (adat.trainer.foglalt && Array.isArray(adat.trainer.foglalt)) {
            if (typeof adat.trainer.foglalt[0] === 'string') {
              convertedBooked = adat.trainer.foglalt.map((slot) => {
                const [datePart, timePart] = slot.split(',');
                return { date: datePart.trim(), time: timePart.trim() };
              });
            } else {
              convertedBooked = adat.trainer.foglalt;
            }
          }
          setTrainer({ ...adat.trainer, foglalt: convertedBooked });
        }
      } catch (err) {
        Alert.alert("Hiba", "Nem sikerült betölteni az adatokat.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5c542" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Fejléc */}
      <View style={styles.header}>
        <Image
          source={{ uri: trainer?.kep || 'https://placehold.co/150x150/EEEEEE/333333?text=Edző' }}
          style={styles.profileImg}
        />
        <Text style={styles.trainerName}>{trainer?.nev}</Text>
      </View>

      {/* Info Kártya */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Személyi edzési szolgáltatások</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Speciális terület:</Text>
            <Text style={styles.value}>{trainer?.specialization || 'Nincs megadva'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Ár (kb.):</Text>
            <Text style={[styles.value, styles.price]}>{trainer?.ar} Ft</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Bemutatkozás és módszer</Text>
        <Text style={styles.description}>
          {trainer?.experience || 'Jelenleg nincs részletes leírás az edzőről.'}
        </Text>

        <Text style={styles.sectionTitle}>Kapcsolat</Text>
        <View style={styles.contactRow}>
          <Text style={styles.label}>E-mail: </Text>
          <Text style={styles.emailValue}>{trainer?.elerhetoseg || '—'}</Text>
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => setIsModalOpen(true)}
        >
          <Text style={styles.bookButtonText}>Időpontot foglalok</Text>
        </TouchableOpacity>
      </View>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        trainer={trainer}
        today={today}
        generateTimes={(date) => generateAvailableTimes(date, trainer?.foglalt)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#f5c542',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#1a1a1a',
  },
  trainerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f5c542',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5c542',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    width: '48%',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    color: '#4CAF50',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 15,
  },
  description: {
    color: '#eee',
    lineHeight: 22,
    textAlign: 'justify',
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  emailValue: {
    color: '#f5c542',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#f5c542',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default TrainerDetails;