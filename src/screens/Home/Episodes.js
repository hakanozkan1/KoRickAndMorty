import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import Header from '../../components/Header';
import HomeItem from '../../components/HomeItem';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { SafeAreaView } from 'react-native-safe-area-context';

const Episodes = () => {

  const [fetchedData, updateFetchedData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [fakeData, setFakeData] = useState([]);
  const [filtered, setFiltered ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  let PageSize = 5;
  let firstPageIndex = (currentPage - 1) * PageSize;
  let lastPageIndex = firstPageIndex + PageSize;
  const windowHeight = Dimensions.get('window').height;

  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
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
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [toggleSearchBar])

  let api = 'https://rickandmortyapi.com/api/episode?page=1';
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      let promiseHandler = [];
      let pages = data.info.pages;
      let array = []
      for (let i = 1; i < pages + 1; i++){
        promiseHandler.push(fetch(`https://rickandmortyapi.com/api/episode?page=${i}`).then(value => value.json()));
      }
      await Promise.all(promiseHandler).then((value) => {
        value.map(val => {
          array.push(...val.results)
        });
      }).then(() => {
        
        updateFetchedData(array)
        setFiltered(array)
        setFakeData(array.slice(firstPageIndex, lastPageIndex));
        setLoading(false);
      });
    })();
  }, [api]);

  useEffect(() => {
    setCurrentPage(1);
    let results = fetchedData.filter((data) => data.name.toUpperCase().includes(searchPhrase
      .toUpperCase().trim().replace(/\s/g, "")) || data.episode.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
      setFiltered(results)
      return setFakeData(results.slice(firstPageIndex, lastPageIndex));
    }, [searchPhrase]);

  useEffect(() => {
    return setFakeData(filtered.slice(firstPageIndex, lastPageIndex));
  }, [currentPage]);



  return (
    <SafeAreaView style={{backgroundColor: "white", height: windowHeight, flex:1}}>
      <Header search={true} profile={true} title='Episodes' 
      setToggleSearchBar={setToggleSearchBar} toggleSearchBar={toggleSearchBar} />
        <ScrollView>
            <Animated.View style={{ transform: [{ translateY: searchBarAnim }] }}>
          <View style={styles.flow}>
              <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              />
              {fakeData.map((data) => (
                <HomeItem data={data} key={data.id} />
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
          </Animated.View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && <ActivityIndicator size={42} color={"#2E3D9A"} />}
      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Episodes;

const styles = StyleSheet.create({
  flow: {
    paddingHorizontal: 0,
    alignItems: "center",
    marginBottom: 30,
    width: '100%',
  },
  bottom: {
    marginBottom: 100
  },
});