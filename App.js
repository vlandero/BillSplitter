import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './pages/Homescreen';
import CreatePage from './pages/CreatePage';
import BillPage from './pages/BillPage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Homescreen} options={{headerShown:false}} />
        <Stack.Screen name='Create' component={CreatePage} />
        <Stack.Screen name='BillPage' component={BillPage} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
});
