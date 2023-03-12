import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Episodes from "./Episodes";
import Details from "./Details";
import CharacterDetails from './CharacterDetails';

const HomeStack = createNativeStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Episodes"
        component={Episodes}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CharacterDetails"
        component={CharacterDetails}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}