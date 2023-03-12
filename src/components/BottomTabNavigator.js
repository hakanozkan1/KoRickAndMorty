import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
    HomeStackScreen,
    FavoriteStackScreen
  } from "../screens";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
            height: 48,
            position: 'absolute',
            bottom: 0,
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 10,
            shadowRadius: 16.0,
            elevation: 24,
            shadowColor: "black",
        },
        tabBarActiveBackgroundColor: "#d5d8ea",
        tabBarInactiveBackgroundColor: '#F7F7F7',
      }}
    >
       <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View>
                {focused ? (
                  <MaterialCommunityIcons name="youtube-tv" color={"#2E3D9A"} size={36} />
                ) : (
                  <MaterialCommunityIcons name="youtube-tv" color={"gray"} size={36} />
                )}
              </View>
            </>
          ),
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View>
                {focused ? (
                  <Ionicons name="ios-people" color={"#2E3D9A"} size={28} />
                ) : (
                  <Ionicons name="ios-people" color={"gray"} size={28} />
                )}
              </View>
            </>
          ),
        }}
        component={FavoriteStackScreen}
      />
    </Tab.Navigator> 
    )
  }

export default BottomTabNavigator;