import {StyleSheet, View, Dimensions, Pressable, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { usePagination, DOTS } from './usePagination';

const Pagination = (props) => {

  const {
    setCurrentPage,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  return (
    <View style={styles.container}>
      {paginationRange.map((pageNumber) => (
        pageNumber === DOTS ?
        <View key={pageNumber} style={styles.button}
        onPress={() => setCurrentPage(pageNumber)}>
          <Text style={styles.text}>{pageNumber}</Text>
        </View>
      :
        <Pressable key={pageNumber} style={currentPage === pageNumber ? styles.buttonActive : styles.button} 
        onPress={() => setCurrentPage(pageNumber)}>
          <Text style={[styles.text, currentPage === pageNumber ?
            { color: 'white'} : { color: 'black'}]}>
          {pageNumber}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  button: {
    width: 35,
    height: 35,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35/2,
    backgroundColor: 'white',
  },
  buttonActive: {
    width: 35,
    height: 35,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2E3D9A',
  },
  text: {
    color: 'black'
  }
});
