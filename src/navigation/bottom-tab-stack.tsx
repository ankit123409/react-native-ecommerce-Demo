import React from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../presentation/screens/dashboard/dashboard-screen';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => <View style={{ flex: 1, backgroundColor: 'transparent' }} />;



const BottomTabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('../assets/icons/dashboard.png')}
              style={{ tintColor: focused ? '#8A2BE2' : '#fff', width: 22, height: 22 }} />
          ),
        }}
      />

      <Tab.Screen
        name="MenuStatic"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({focused}) => 
           <Image source={require('../assets/icons/filtermenu.png')}
              style={{ tintColor: focused ? '#8A2BE2' : '#fff', width: 22, height: 22 }} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />

      <Tab.Screen
        name="BagStatic"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => 
              <Image source={require('../assets/icons/cart.png')}
              style={{ tintColor:  '#fff', width: 20, height: 24 }} />
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="WishStatic"
        component={EmptyScreen}
        options={{
          tabBarIcon: () => 
              <Image source={require('../assets/icons/like.png')}
              style={{ tintColor:  '#fff', width: 26, height: 22 }} />
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="ProfileStatic"
        component={EmptyScreen}
        options={{
            tabBarIcon: () => 
              <Image source={require('../assets/icons/profile.png')}
              style={{ tintColor:  '#fff', width: 20, height: 22 }} />
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;