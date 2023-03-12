import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/core";

const CharacterDetails = (props) => {
  const navigation = useNavigation();
  const { data } = props.route.params
  const [fav, setFav] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.addToFavorites.value);

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
    if (fav === false){
        dispatch(addToFavorites(data));
    } else {
        showConfirmDialog()
    }
  }

  useEffect(() => {
    let array = []
    favorites.map(val => array.push(val.id));
    setFav(array.includes(data.id));
  }, [favorites]);
  return (
    <View>
      {/* <Header back={true} title='Character Details' /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: data.image }}
        style={{width: windowWidth, height: windowWidth}}
      />
      <View style={styles.container}>
            <Text style={styles.title}>
                {data.name}
            </Text>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 10
                }}
                />
            <View style={styles.wrap}>
                <View style={styles.col}>
                <View style={styles.row}>
                        <FontAwesome name="heartbeat"
                        color={"#2E3D9A"} size={15} />
                    <Text style={styles.color}>
                        {'  Status: '}
                    </Text>
                    <Text style={styles.desc}>
                        {data.status}
                    </Text>
                </View>
                <View style={styles.row}>
                        <Foundation name="male-female"
                        color={"#2E3D9A"} size={22} />
                    <Text style={styles.color}>
                        {'  Gender: '}
                    </Text>
                    <Text style={styles.desc}>
                        {data.gender}
                    </Text>
                </View>
                </View>
                <View style={styles.col}>
                    <View style={styles.row}>
                        <MaterialIcons name="person"
                        color={"#2E3D9A"} size={22} />
                        <Text style={styles.color}>
                            {' Species: '}
                        </Text>
                        <Text style={styles.desc}>
                            {data.species}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text>
                          {' '}
                        </Text>
                        <MaterialCommunityIcons name="play-box-multiple"
                        color={"#2E3D9A"} size={15} />
                        <Text style={styles.color}>
                            {' Episodes: '}
                        </Text>
                        <Text style={styles.desc}>
                            {data.episode.length}
                        </Text>
                    </View>
                </View>
        </View>
        <TouchableOpacity style={styles.favorite} onPress={handler}>
            {fav === false ?
                <MaterialIcons name="favorite-outline"
                color={"#2E3D9A"} size={42} /> :
                <MaterialIcons name="favorite"
                color={"#2E3D9A"} size={42} />
            }
            {fav === false ?
                <Text style={styles.color}>
                Add to favorites
                </Text> :
                <Text style={styles.color}>
                Remove from favorites
                </Text>
            }
            
          </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={styles.back}>
        <MaterialIcons name="arrow-back" color={"white"} size={30}
         onPress={() => navigation.goBack()}/>
      </View>

    </View>
  )
}

export default CharacterDetails

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -35,
        zIndex: 5,
        backgroundColor: "white",
        padding: 28,
        marginBottom: 80,
    },
    wrap: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    col:{
        flexDirection: 'column'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
  },
    title: {
        color: '#F95696',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        width: 110,
        height: 19,
        borderColor: "#B9CBC0",
        borderRadius: 10,
        borderWidth: 1,
        alignItems: "center",
        marginTop: 14,
      },
      buttonText: {
        fontSize: 12,
        color: "#0A8754"
      },
      desc: {
        fontSize: 14,
        color: "#292929",
        fontWeight: '400',
      },
      color:{
        color: '#2E3D9A',
        fontSize: 14,
        marginVertical: 10,
        fontWeight: '500',
      },
      favorite: {
        alignItems: 'center',
        marginTop: 35,
      },
      back: {
        position: "absolute",
        left: 18,
        zIndex: 1,
        top: 18,
        width: 44,
        height: 44,
        borderRadius: 44/2,
        backgroundColor: '#2E3D9A',
        justifyContent: 'center',
        alignItems: 'center'
      },
})