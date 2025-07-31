import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screen/Mapscreen';
import LoginScreen from './screen/Login';
import RegisterScreen from './screen/Register';
import HomeScreen from './screen/Home';
import FeedbackScreen from './screen/FeedbackScreen';    // Import feedback page
import ThankYouScreen from './screen/ThankYouScreen';    // Import thank you page

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Thank You" component={ThankYouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
