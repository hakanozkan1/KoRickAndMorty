import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const SearchBar = ({searchPhrase, setSearchPhrase}) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.searchBar_}
      >
        <Feather
          name="search"
          size={18}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar_: {
    paddingLeft: 15,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
  },
});