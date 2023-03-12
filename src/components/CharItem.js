import { StyleSheet, Text, View, Image, Pressable, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import { addToFavorites, removeFromFavorites } from '../redux/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';

const CharItem = ({data, fav}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showConfirmDialog = () => {
    return Alert.alert(
      "You are removing a character.",
      "Are you sure you want to remove this character from favorites?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(removeFromFavorites(data));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const handler = () => {
    if (!fav){
        dispatch(addToFavorites(data));
    } else {
        showConfirmDialog()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper} />
        <TouchableOpacity style={styles.touch}
        onPress={() => navigation.navigate('CharacterDetails', { data })} >
          <Image source={{ uri: data.image }}
          style={styles.image} />
          <View style={styles.card}>
          <Text numberOfLines={1} style={styles.name}>
                {data.name}
            </Text>
            <View style={styles.icons}>
                <Text numberOfLines={1} style={styles.iconText}>
                    {data.status}
                    {' | '}
                    {data.species}
                </Text>
            </View>
          </View>  
         </TouchableOpacity>
         <TouchableOpacity style={styles.favorite} onPress={handler}>
            {fav === false ?
                <MaterialIcons name="favorite-outline"
                color={"white"} size={28} /> :
                <MaterialIcons name="favorite"
                color={"white"} size={28} />
            }
          </TouchableOpacity>
    </View>
  )
}

export default CharItem

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: 200,
        borderRadius: 10,
        marginTop: 18,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4,
    },
    wrapper: {
      backgroundColor: '#2E3D9A',
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    touch:{
      height: 200,
      alignItems: 'center',
    },
    image: {
        width: 135,
        height: 135,
        borderRadius: 135 / 2,
        overflow: "hidden",
        zIndex: 99,
        marginTop: 14,
    },
    card: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 8,
    },
    name: {
        color: '#F95696',
        fontWeight: '700',
        fontSize: 16,
        flex: 1, 
        flexWrap: 'wrap'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    iconText: {
        color: '#2E3D9A',
        fontSize: 13,
        flexWrap: 'wrap',
    },
    favorite: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 99
    }
})