import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useFocusEffect } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setRole('student');
    }, [])
  );

  const handleLogin = () => {
    if (role === 'student') navigation.navigate('Student');
    else if (role === 'warden') navigation.navigate('Warden');
    else if (role === 'staff') navigation.navigate('Staff');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>

         
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={28} color="#1E293B" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.welcomeText}>Welcome Back</Text>

          <Icon
            name="home"
            size={90}
            color="#26A69A"
            style={styles.logo}
          />

          <Text style={styles.subtitle}>
            Report or manage hostel issues easily
          </Text>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.inputLabel}>Email / University ID</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person-outline" size={24} color="#64748B" style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="e.g. 2020cs123@stu.cmb.ac.lk"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Icon name="lock-outline" size={24} color="#64748B" style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                secureTextEntry
              />
            </View>
          </View>

          {/* Role Selection – card style similar to teams cards */}
          <View style={styles.roleContainer}>
            {[
              { key: 'student', label: 'Student', icon: 'school' },
              { key: 'warden', label: 'Warden', icon: 'account-balance' },
              { key: 'staff', label: 'Staff', icon: 'engineering' },
            ].map(r => (
              <TouchableOpacity
                key={r.key}
                onPress={() => setRole(r.key)}
                style={[
                  styles.roleCard,
                  role === r.key && styles.selectedRoleCard,
                ]}
                activeOpacity={0.85}
              >
                <Icon
                  name={r.icon}
                  size={32}
                  color={role === r.key ? '#FFFFFF' : '#26A69A'}
                  style={styles.roleIcon}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === r.key && { color: '#FFFFFF' },
                  ]}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign In Button*/}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>

          {/* Register Link*/}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerHighlight}>Register</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  innerContainer: {
    alignItems: 'center',
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  backText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },

  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  logo: {
    marginVertical: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 48,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 24,
  },

  fieldContainer: {
    width: '100%',
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 17,
    color: '#1E293B',
  },

  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 56,
  },
  roleCard: {
    width: 110,
    height: 120,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedRoleCard: {
    backgroundColor: '#26A69A',
    borderColor: '#26A69A',
  },
  roleIcon: {
    marginBottom: 12,
  },
  roleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },

  loginBtn: {
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#26A69A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#64748B',
  },
  registerHighlight: {
    color: '#26A69A',
    fontWeight: '700',
  },
});