import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Image */}
        <Image
          source={require('../assets/image.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* App Name & Tagline */}
        <Text style={styles.title}>Hostel Manager</Text>
        <Text style={styles.subtitle}>Manage your team effortlessly</Text>

        {/* Teams Section */}
        <View style={styles.teamsContainer}>
       
          <TouchableOpacity style={[styles.teamCard, { backgroundColor: '#E0F2F1' }]}>
            <Icon name="cleaning-services" size={44} color="#26A69A" style={styles.teamIcon} />
            <Text style={styles.teamText}>Cleaning</Text>
          </TouchableOpacity>

        
          <TouchableOpacity style={[styles.teamCard, { backgroundColor: '#E0F2F1' }]}>
            <Icon name="support-agent" size={44} color="#26A69A" style={styles.teamIcon} />
            <Text style={styles.teamText}>Reception</Text>
          </TouchableOpacity>

       
          <TouchableOpacity style={[styles.teamCard, { backgroundColor: '#E0F2F1' }]}>
            <Icon name="room-service" size={44} color="#26A69A" style={styles.teamIcon} />
            <Text style={styles.teamText}>Kitchen</Text>
          </TouchableOpacity>

        </View>

        {/* Login / Register Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.registerBtnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', 
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  headerImage: {
    width: '100%',
    height: 240,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 24,
  },
  teamsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '92%',
    gap: 20,
    marginBottom: 56,
  },
  teamCard: {
    width: 108,
    height: 118,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  teamIcon: {
    marginBottom: 12,
  },
  teamText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },


  addTeamCard: {
    width: 108,
    height: 118,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#26A69A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 166, 154, 0.08)', 
  },
  addIcon: {
    marginBottom: 8,
  },
  addText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#26A69A',
  },

 
  buttonContainer: {
    width: '82%',
    marginTop: 16,
  },
  loginBtn: {
    backgroundColor: '#26A69A', 
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  registerBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 16, 
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#26A69A', 
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  registerBtnText: {
    color: '#26A69A', 
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});