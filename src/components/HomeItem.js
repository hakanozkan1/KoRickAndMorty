import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react';
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";

const HomeItem = ({data}) => {
  const navigation = useNavigation();
  return (
    <Pressable key={data.id} onPress={() => navigation.navigate('Details', { data })} 
    style={styles.container}>
      <View style={styles.circle}>
          <MaterialCommunityIcons name="movie-open" color={"#2E3D9A"} size={30} />
      </View>
      <View style={styles.col}>
          <Text numberOfLines={1} style={styles.title}>
            {data.name}
          </Text>
          <View style={styles.bottom}>
            <Text style={styles.likeText}>{data.episode}</Text>
            <View style={styles.row}>
            <Ionicons name="md-time-outline" color={"#999EB9"} size={16}
              style={{marginLeft: 19, marginRight: 6, paddingTop: 3}} />
            <Text style={styles.dateText}>{data.air_date}</Text>
          </View>
        </View>
      </View>
        
    </Pressable>
  )
}

export default HomeItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: '90%',
        height: 85,
        borderRadius: 10,
        marginTop: 18,
        borderColor: '#AEDEEE',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',flex: 1
    },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: "black",
    flex: 1, 
    flexWrap: 'wrap',
    marginTop: 15,
  },
  row:{
    flexDirection: 'row',
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 20,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
  },
  button: {
    width: 110,
    height: 19,
    borderColor: "#B9CBC0",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "#999EB9",
    marginRight: 15,
  },
  likeText: {
    color: "#F95696",
    fontWeight: '600',
    fontSize: 14,
  },
  circle: {
    width: 58,
   height: 58,
   borderRadius: 16,
   backgroundColor: '#F4F4F4',
   alignItems: 'center',
   justifyContent: 'center',
   marginLeft: 20,
  },
})