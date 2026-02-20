
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './screens/Landingscreen'; 
import LoginScreen from './screens/Loginscreen';
import RegisterScreen from './screens/Registerscreen';
import StudentDashboard from './screens/StudentDashboard';
import WardenDashboard from './screens/WardenDashboard';
import StaffDashboard from './screens/StaffDashboard';

export const ComplaintContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [complaints, setComplaints] = useState([]); // Shared complaints for all

  return (
    <ComplaintContext.Provider value={{ complaints, setComplaints }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
          <Stack.Screen name="Landing" component= {LandingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Student" component={StudentDashboard} />
          <Stack.Screen name="Warden" component={WardenDashboard} />
          <Stack.Screen name="Staff" component={StaffDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </ComplaintContext.Provider>
  );
}
