import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './src/navigation/app-navigator';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
       <Provider store={store}>
        <NavigationContainer>
    <AppNavigator />
    </NavigationContainer >
    </Provider>
  )
}

export default App