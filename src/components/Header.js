import * as React from "react";
import {  View, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ProfileNavigation({ back, search, title, setToggleSearchBar, toggleSearchBar }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {back ?
      <MaterialIcons name="arrow-back" color={"white"} size={30}
      style={styles.back} onPress={() => navigation.goBack()}/>: null}
      {setToggleSearchBar ?
      <MaterialIcons name={toggleSearchBar === true ? "search-off" : "search"} color={"white"} size={30}
      style={styles.search} onPress={() => setToggleSearchBar(!toggleSearchBar)}/>: null}
      <View style={styles.title}>
        <Text style={styles.text}>
          {title}
        </Text>
      </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: "auto",
        height: 60,
        zIndex: 99,
        backgroundColor: "#2E3D9A",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

    },
    back: {
      position: "absolute",
      left: 18,
      zIndex: 1,
    },
    search: {
      position: "absolute",
      right: 18,
      zIndex: 1,
    },
    title: {
      flex:1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: 'white',
      fontWeight: '600',
      fontSize: 20,
    }
});
