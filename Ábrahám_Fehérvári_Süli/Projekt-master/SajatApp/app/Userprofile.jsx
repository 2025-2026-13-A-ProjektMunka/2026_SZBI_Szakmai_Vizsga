import React, { useState, useEffect, useRef, useContext } from 'react';
import { 
  StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, 
  Modal, FlatList, Alert, ActivityIndicator, Dimensions 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { logoContext } from '../App'; // Feltételezve a környezetet

// --- AVATÁR ADATOK (Ugyanazok az URL-ek, amiket megadtál) ---
const FEMALE_AVATARS = [
  { id: 'f_1', url: 'https://cdn-icons-png.flaticon.com/512/3067/3067825.png' },
  { id: 'f_2', url: 'https://cdn-icons-png.flaticon.com/512/3067/3067838.png' },
  // ... a többi marad az eredeti listából
];

const MALE_AVATARS = [
  { id: 'm_1', url: 'https://cdn-icons-png.flaticon.com/512/3067/3067840.png' },
  // ... a többi marad az eredeti listából
];

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // A Context-et csak akkor használd, ha RN-ben is implementáltad
  // const { setLogo } = useContext(logoContext); 

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const userL = JSON.parse(storedUser);
        setUser(userL);
        fetchReservations(userL);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async (userL) => {
    try {
      const response = await fetch(`http://YOUR_IP_ADDRESS:3500/api/users-frontend/`);
      const valasz = await response.json();
      if (response.ok) {
        const reser = valasz.reservations.filter(res => res.user._id === userL._id);
        setReservations(reser);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Kép választása galériából
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      updateProfilePic(uri);
    }
  };

  const updateProfilePic = async (avatarUrl) => {
    setProfilePicture(avatarUrl);
    setIsAvatarModalOpen(false);
    try {
      await fetch(`http://YOUR_IP_ADDRESS:3500/api/users-frontend/${user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kep: avatarUrl }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelReservation = (resId, trainerName, date) => {
    Alert.alert(
      "Foglalás lemondása",
      `Biztosan lemondod a(z) ${trainerName} edzőhöz tartozó ${date} időpontot?`,
      [
        { text: "Mégse", style: "cancel" },
        { 
          text: "Lemondom", 
          style: "destructive", 
          onPress: async () => {
            try {
              const response = await fetch(`http://YOUR_IP_ADDRESS:3500/api/idopont-foglal/${resId}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                setReservations(prev => prev.filter(r => r._id !== resId));
                Alert.alert("Sikeres", "Időpont lemondva.");
              }
            } catch (e) {
              Alert.alert("Hiba", "Nem sikerült a lemondás.");
            }
          }
        }
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{flex:1}} color="#f5c542" />;

  return (
    <ScrollView style={styles.container}>
      {/* Header / Profilkép */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.picWrapper}>
          <Image 
            source={{ uri: profilePicture || user?.avatar || 'https://via.placeholder.com/150' }} 
            style={styles.profilePic} 
          />
          <View style={styles.uploadOverlay}>
            <Text style={styles.uploadText}>Módosítás</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.name}>{user?.name || "Felhasználó"}</Text>
        <TouchableOpacity 
          style={styles.avatarPickerBtn} 
          onPress={() => setIsAvatarModalOpen(true)}
        >
          <Text style={styles.avatarPickerBtnText}>🖼️ Avatár választása</Text>
        </TouchableOpacity>
      </View>

      {/* Foglalások */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aktuális foglalásaim</Text>
        {reservations.length === 0 ? (
          <Text style={styles.emptyText}>Nincs aktív foglalásod.</Text>
        ) : (
          reservations.map((res) => (
            <View key={res._id} style={styles.resCard}>
              <Image source={{ uri: res.trainer.kep }} style={styles.trainerThumb} />
              <View style={styles.resInfo}>
                <Text style={styles.trainerName}>{res.trainer.nev}</Text>
                <Text style={styles.resDate}>{res.idopont}</Text>
              </View>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => handleCancelReservation(res._id, res.trainer.nev, res.idopont)}
              >
                <Text style={styles.cancelBtnText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Infó szekció */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kapcsolati adatok</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
      </View>

      {/* AVATÁR MODAL */}
      <Modal visible={isAvatarModalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Válassz avatárt</Text>
            <FlatList
              data={[...MALE_AVATARS, ...FEMALE_AVATARS]}
              numColumns={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => updateProfilePic(item.url)}>
                  <Image source={{ uri: item.url }} style={styles.avatarThumb} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.closeModalBtn} 
              onPress={() => setIsAvatarModalOpen(false)}
            >
              <Text style={styles.closeModalText}>Bezárás</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  header: { alignItems: 'center', padding: 40, borderBottomWidth: 1, borderBottomColor: '#333' },
  picWrapper: { width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: '#f5c542', overflow: 'hidden' },
  profilePic: { width: '100%', height: '100%' },
  uploadOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', padding: 5 },
  uploadText: { color: '#f5c542', fontSize: 10, textAlign: 'center' },
  name: { color: '#f5c542', fontSize: 24, fontWeight: 'bold', marginTop: 15 },
  avatarPickerBtn: { marginTop: 15, backgroundColor: '#f5c542', padding: 10, borderRadius: 20 },
  avatarPickerBtnText: { color: '#000', fontWeight: 'bold' },
  
  section: { padding: 20 },
  sectionTitle: { color: '#f5c542', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  resCard: { 
    flexDirection: 'row', backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, 
    alignItems: 'center', marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#f5c542' 
  },
  trainerThumb: { width: 50, height: 50, borderRadius: 25 },
  resInfo: { flex: 1, marginLeft: 15 },
  trainerName: { color: '#fff', fontWeight: 'bold' },
  resDate: { color: '#aaa', fontSize: 12 },
  cancelBtn: { backgroundColor: '#e74c3c', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  cancelBtnText: { color: '#fff', fontWeight: 'bold' },
  
  infoRow: { flexDirection: 'row', marginBottom: 10 },
  infoLabel: { color: '#f5c542', width: 60, fontWeight: 'bold' },
  infoValue: { color: '#ccc' },
  emptyText: { color: '#666', fontStyle: 'italic' },

  // Modal stílusok
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center' },
  modalContent: { backgroundColor: '#1a1a1a', margin: 20, padding: 20, borderRadius: 20, maxHeight: '80%' },
  modalTitle: { color: '#f5c542', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  avatarThumb: { width: 60, height: 60, margin: 5, borderRadius: 30, borderWidth: 1, borderColor: '#333' },
  closeModalBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  closeModalText: { color: '#f5c542', fontWeight: 'bold' }
});

export default UserProfile;