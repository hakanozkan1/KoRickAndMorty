import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favorites from "./Favorites";

const FavoriteStack = createNativeStackNavigator();
export default function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </FavoriteStack.Navigator>
  );
}