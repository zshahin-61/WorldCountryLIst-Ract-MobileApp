import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
export default function FavoritesScreen() {
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  const fetchFavoriteCountries = useCallback(async () => {
    try {
      const favoriteCountriesCollectionRef = collection(db, 'favoriteCountries');
      const snapshot = await getDocs(favoriteCountriesCollectionRef);
      const favoriteCountriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteCountries(favoriteCountriesData);
    } catch (error) {
      console.error('Error fetching favorite countries:', error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('screen is loaded');
      fetchFavoriteCountries();
    }, [])
  );

  const handleDeleteItem = async (itemId) => {
    try {
      // Remove the item from the state (optimistic update)
      setFavoriteCountries((prevFavoriteCountries) =>
        prevFavoriteCountries.filter((country) => country.id !== itemId)
      );

      // Delete the corresponding document from the 'favoriteCountries' collection
      await deleteDoc(doc(db, 'favoriteCountries', itemId));
    } catch (error) {
      console.error('Error deleting favorite country:', error);
    }
  };

  // Render function for each row in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.countryItem}>
      <Image source={{ uri: item.flag }} style={styles.flagImage} />
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryCapital}>Capital: {item.capital}</Text>
        <Text style={styles.countryPopulation}>Population: {item.population}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
      <Ionicons name="trash-outline" size={24} color="red" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Assuming each item has a unique identifier like "id"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  flagImage: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  countryCapital: {
    fontSize: 16,
  },
  countryPopulation: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
