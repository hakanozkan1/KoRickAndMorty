import { ScrollView, StyleSheet, Text, View, Image, Pressable, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header'
import CharItem from '../../components/CharItem';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from 'react-native-safe-area-context';


const Details = (props) => {
  const { data } = props.route.params;
  const [fetchedData, updateFetchedData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [fakeData, setFakeData] = useState([]);
  const [filtered, setFiltered ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fav, setFav] = useState([])
  const [loading, setLoading] = useState(true);

  const favorites = useSelector(state => state.addToFavorites.value);
  let PageSize = 6;
  let firstPageIndex = (currentPage - 1) * PageSize;
  let lastPageIndex = firstPageIndex + PageSize;

  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const searchBarAnim = useRef(new Animated.Value(-45)).current
  useEffect(() => {
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      setSearchPhrase("")
      Animated.timing(searchBarAnim, {
        toValue: -70,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [toggleSearchBar])

  useEffect(() => {
    (async function () {
    let promiseHandler = [];
    let array = []
    data.characters.map((url) => promiseHandler.push(fetch(url)
    .then(value => value.json())));
    Promise.all(promiseHandler).then((value) => {
      value.map(val => {
        array.push(val);
      });
    }).then(() => {
      updateFetchedData(array)
      setFiltered(array)
      setFakeData(array.slice(firstPageIndex, lastPageIndex));
      setLoading(false);
    });
  })();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    let results = fetchedData.filter((data) =>
      data.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")) ||
      data.gender.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")) ||
      data.species.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")) ||
      data.status.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
      setFiltered(results);
      return setFakeData(results.slice(firstPageIndex, lastPageIndex));
    }, [searchPhrase]);

  useEffect(() => {
    return setFakeData(filtered.slice(firstPageIndex, lastPageIndex));
  }, [currentPage]);

  useEffect(() => {
    let array = []
    favorites.map(val => array.push(val.id));
    setFav(array)
  }, [favorites]);
  
  
  return (
    <SafeAreaView>
      <Header back={true} title='Episode Details'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <Text style={styles.info_text}>{data.episode}{' - '}</Text>
            <Text style={styles.info_text}>{data.name}</Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.info_text}>{data.air_date}</Text>
          </View>
        </View>
        <View style={styles.characterHeader}>
            <Text style={styles.characterText}>Characters</Text>
            <MaterialIcons name={toggleSearchBar === true ? "search-off" : "search"} color={"#2e3d9a"} size={26}
      style={styles.search} onPress={() => setToggleSearchBar(!toggleSearchBar)}/>
        </View>
        <Animated.View style={{ transform: [{ translateY: searchBarAnim }] }}>
        <View style={styles.flow}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase} />
          <View style={styles.container}>
          {fakeData.map((data) => (
            fav.includes(data.id) ?
            <CharItem data={data} key={data.id} fav={true} /> :
            <CharItem data={data} key={data.id} fav={false} />
            ))}
          </View>
          {filtered.length > PageSize ?
            <Pagination
            currentPage={currentPage}
            totalCount={filtered.length}
            pageSize={PageSize}
            setCurrentPage={page => setCurrentPage(page)}
            />:
            <View style={styles.bottom} />}
        </View>
        </Animated.View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && <ActivityIndicator size={42} color={"#2E3D9A"} />}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Details

const styles = StyleSheet.create({
    info:{
      width: '100%',
      paddingHorizontal: 18,
      backgroundColor: 'white',
      zIndex: 99,
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height:40,
      justifyContent: 'center'
    },
    info_text:{
      color: 'black',
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center'
    },
    characterHeader:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      backgroundColor: '#d5d8ea',
      zIndex: 99
    },
    characterText: {
      color: '#2e3d9a',
      fontWeight: '600',
      fontSize: 16,
    },
    search: {
      position: 'absolute',
      right: 18,
      zIndex: 1,
    },
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
})