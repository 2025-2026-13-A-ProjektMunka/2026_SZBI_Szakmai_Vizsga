import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingModal = ({
  isOpen,
  onClose,
  user,
  trainer,
  today,
  generateTimes,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  // Segédfüggvény a dátum formázásához (YYYY-MM-DD)
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const availableSlots = useMemo(() => {
    return generateTimes(formatDate(selectedDate));
  }, [selectedDate, generateTimes]);

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios'); // iOS-en nyitva marad, Androidon bezárjuk választás után
    if (date) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Hiba', 'Az időpont foglaláshoz be kell jelentkezned!');
      return;
    }

    try {
      const response = await fetch(
        `http://YOUR_IP_ADDRESS:3500/api/idopont-foglal/${trainer._id}`,
        {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            userid: user._id,
            selectedDate: formatDate(selectedDate),
            selectedTime,
          }),
        }
      );

      const valasz = await response.json();

      if (response.ok) {
        Alert.alert('Sikeres foglalás', valasz.msg);
        onClose();
      }
    } catch (error) {
      Alert.alert('Hiba', 'Nem sikerült csatlakozni a szerverhez.');
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Bezárás gomb */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Időpontfoglalás</Text>
          <Text style={styles.subtitle}>Edző: {trainer?.nev}</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Dátum választó szekció */}
            <Text style={styles.label}>1. Válaszd ki a napot:</Text>
            <TouchableOpacity 
              style={styles.datePickerButton} 
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={onDateChange}
              />
            )}

            {/* Időpont választó szekció */}
            <Text style={[styles.label, { marginTop: 20 }]}>2. Válaszd ki az időpontot:</Text>
            <View style={styles.timeGrid}>
              {availableSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.time}
                  disabled={slot.isBooked}
                  style={[
                    styles.timeSlot,
                    selectedTime === slot.time && styles.selectedSlot,
                    slot.isBooked && styles.bookedSlot
                  ]}
                  onPress={() => setSelectedTime(slot.time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === slot.time && styles.selectedTimeText,
                    slot.isBooked && styles.bookedTimeText
                  ]}>
                    {slot.time}
                  </Text>
                  {slot.isBooked && <Text style={styles.bookedSmallText}>(Foglalt)</Text>}
                </TouchableOpacity>
              ))}
            </View>

            {/* Megerősítés */}
            <TouchableOpacity
              style={[styles.confirmButton, (!selectedTime) && styles.disabledButton]}
              disabled={!selectedTime}
              onPress={handleBooking}
            >
              <Text style={styles.confirmButtonText}>Foglalás megerősítése</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#f5c542',
    fontSize: 35,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5c542',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  label: {
    color: '#f5c542',
    fontWeight: '600',
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: '#222',
    width: '30%',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedSlot: {
    backgroundColor: '#f5c542',
    borderColor: '#f5c542',
  },
  bookedSlot: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  timeText: {
    color: '#ccc',
    fontWeight: '600',
  },
  selectedTimeText: {
    color: '#111',
  },
  bookedTimeText: {
    color: '#888',
  },
  bookedSmallText: {
    fontSize: 10,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#f5c542',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#f5c542',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default BookingModal;