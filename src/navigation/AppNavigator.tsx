import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MarketDataScreen from '../screens/MarketDataScreen';
import theme from '../styles/theme';
import { useSelectedImage } from '../context/SelectedImageContext';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { selectedImage } = useSelectedImage();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.primary,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Market Data') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarButton: (props) => {
            if (route.name === 'Profile' && !selectedImage) {
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                  <TouchableOpacity disabled={true}>
                    <Icon name="person-outline" size={30} color="gray" />
                    <Text style={{ color: 'gray', fontSize: theme.fonts.size.small }} data-testid="profile">Profile</Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return <TouchableOpacity {...props} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Market Data" component={MarketDataScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
