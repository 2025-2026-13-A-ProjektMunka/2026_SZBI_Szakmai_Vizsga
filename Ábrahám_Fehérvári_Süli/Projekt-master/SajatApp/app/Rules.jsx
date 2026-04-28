import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Linking, 
  TouchableOpacity 
} from 'react-native';

const Rules = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HERO SZEKCIÓ */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Gympower Edzőterem Szabályzat</Text>
            <Text style={styles.heroSubtitle}>
              Biztonságos, higiénikus és motiváló környezet mindenkinek – eddz felelősséggel!
            </Text>
          </View>
        </View>

        {/* SZABÁLYZAT TARTALOM */}
        <View style={styles.contentPadding}>
          
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>1. Bevezetés</Text>
            <Text style={styles.sectionText}>
              Üdvözlünk a PowerFit Edzőteremben! A létesítmény használatával minden vendég elfogadja a jelen házirendet, amely a biztonságos és barátságos környezet fenntartását szolgálja.
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>2. Nyitvatartás és belépés</Text>
            <Text style={styles.listItem}>• Nyitvatartás: hétfőtől vasárnapig, 6:00 – 22:00 óráig.</Text>
            <Text style={styles.listItem}>• Belépés kizárólag érvényes bérlettel vagy napijeggyel.</Text>
            <Text style={styles.listItem}>• A belépési jogosultság visszaélése azonnali kizárással járhat.</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>3. Öltöző és értékmegőrzés</Text>
            <Text style={styles.sectionText}>
              Az öltözőben hagyott értéktárgyakért a Szolgáltató felelősséget nem vállal. Javasoljuk a zárható szekrények használatát.
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>4. Higiénia és biztonság</Text>
            <Text style={styles.listItem}>• Törölköző használata a gépeken kötelező.</Text>
            <Text style={styles.listItem}>• Használat után fertőtlenítsd le az eszközöket.</Text>
            <Text style={styles.listItem}>• Tiszta váltócipő és edzőruha használata kötelező.</Text>
            <Text style={styles.listItem}>• Alkoholos befolyásoltság alatt a belépés tilos.</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>5. Viselkedés a teremben</Text>
            <Text style={styles.listItem}>• Tartsd tiszteletben mások edzését.</Text>
            <Text style={styles.listItem}>• Használat után pakold vissza a súlyokat a helyükre.</Text>
            <Text style={styles.listItem}>• Kerüld a hangoskodást és a trágár beszédet.</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>6. Edzői szolgáltatások</Text>
            <Text style={styles.sectionText}>
              Személyi edzéseket kizárólag a PowerFit hivatalos trénerei tarthatnak. Külsős edző csak előzetes engedéllyel dolgozhat.
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>7. Baleset és felelősség</Text>
            <Text style={styles.sectionText}>
              Minden vendég saját felelősségére edz. Rosszullét esetén azonnal értesítsd a személyzetet!
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>8. Kapcsolat</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@powerfit.hu')}>
              <Text style={styles.linkText}>📧 info@powerfit.hu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+36301234567')}>
              <Text style={styles.linkText}>☎️ +36 30 123 4567</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* LÁBLÉC */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Quarter Fitness - Minden jog fenntartva.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  container: {
    flex: 1,
  },
  /* Hero */
  hero: {
    backgroundColor: '#111',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#a68a17',
  },
  heroContent: {
    backgroundColor: '#1b1b1b',
    padding: 25,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#a68a17',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#a68a17',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 20,
  },
  /* Tartalom */
  contentPadding: {
    padding: 20,
  },
  sectionCard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#a68a17',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#a68a17',
    paddingLeft: 10,
  },
  sectionText: {
    color: '#ddd',
    fontSize: 15,
    lineHeight: 22,
  },
  listItem: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 20,
  },
  linkText: {
    color: '#a68a17',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '500',
  },
  /* Footer */
  footer: {
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  }
});

export default Rules;