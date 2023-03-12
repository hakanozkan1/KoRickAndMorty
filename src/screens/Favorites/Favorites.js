import { ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header'
import CharItem from '../../components/CharItem';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';


const Favorites = () => {
  const favorites = useSelector(state => state.addToFavorites.value);
  const windowHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title='Favorite Characters'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flow}>
          <View style={styles.container}>
          {favorites.length > 0 ? favorites.map((data) => (
            favorites.includes(data) === true ?
            <CharItem data={data} key={data.id} fav={true} /> :
            <CharItem data={data} key={data.id} fav={false} />
            )): 
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: (windowHeight - 108)/2}}>
            <Text style={styles.text}>
              There are no characters in your favorites yet.
            </Text>
          </View>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
    flow: {
      paddingHorizontal: 0,
      alignItems: "center",
      marginBottom: 25,
    },
    image: {
        width: "100%",
        height: 285,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '94%',
    },
    bottom: {
      marginBottom: 100
    },
    text: {
      color: '#2E3D9A',
      fontSize: 16,
      fontWeight: '600'
    }
})