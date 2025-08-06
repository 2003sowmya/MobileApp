import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import ClockScreen from './Screen/ClockScreen';
import TimerScreen from './Screen/TimerScreen';
import SettingsScreen from './Screen/SettingScreen';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tab navigation for Clock and Timer with menu icon
function TabNavigator({ navigation, isDarkTheme }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={28} color="tomato" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Clock') iconName = 'time-outline';
          else if (route.name === 'Timer') iconName = 'timer-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Clock">
        {() => <ClockScreen isDarkTheme={isDarkTheme} />}
      </Tab.Screen>
      <Tab.Screen name="Timer">
        {() => <TimerScreen isDarkTheme={isDarkTheme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // hide default drawer header
          drawerActiveTintColor: 'tomato',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="Home">
          {(props) => <TabNavigator {...props} isDarkTheme={isDarkTheme} />}
        </Drawer.Screen>

        <Drawer.Screen
          name="Settings"
          options={{ headerShown: false }} // completely hide Settings header
        >
          {() => <SettingsScreen isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
