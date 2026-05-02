import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VetDashboardScreen from '../screens/vet/VetDashboardScreen';
import MedicalRecordsScreen from '../screens/vet/MedicalRecordsScreen';
import AddEditRecordScreen from '../screens/vet/AddEditRecordScreen';
import ChatScreen from '../screens/ChatScreen';
import MessageInboxScreen from '../screens/MessageInboxScreen';

const Stack = createNativeStackNavigator();

const VetNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="VetDashboard" 
        component={VetDashboardScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MedicalRecords" 
        component={MedicalRecordsScreen} 
        options={{ title: 'Medical Records' }} 
      />
      <Stack.Screen 
        name="AddEditRecord" 
        component={AddEditRecordScreen} 
        options={({ route }) => ({ 
          title: route.params?.record ? 'Edit Record' : 'Add Record' 
        })} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
      />
      <Stack.Screen 
        name="MessageInbox" 
        component={MessageInboxScreen} 
      />
    </Stack.Navigator>
  );
};

export default VetNavigator;
