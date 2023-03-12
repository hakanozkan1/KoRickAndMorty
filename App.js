import { StyleSheet, View} from 'react-native';
import React, { useState} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import BottomTabNavigator from './src/components/BottomTabNavigator';
import {
  FavoriteStackScreen
} from "./src/screens";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import store from "./src/redux/store";

let persistor = persistStore(store);

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favorite"
            component={FavoriteStackScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});