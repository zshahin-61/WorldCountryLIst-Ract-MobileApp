import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useState, useEffect } from "react"
import MapView, { Marker } from 'react-native-maps';
import {  collection, query, onSnapshot, addDoc , getDocs, where} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';

// Route = object contains information sent by prevous screen
// Navigation = object that contains information about the stack navigator
export default function DetailsScreen({ route, navigation }) {
  // state variables
  // - route.params contains the data sent by the previous screen
  // - the previous screen sent an object called "selectedPokemon"
  // - to acess it, we use "route.params.selectedPokemon"
  // - We put the data in a state variable because we intend to show the data
  // in the UI.
  const [selectedItem, setSelectedItem] = useState(route.params.selectedItem)

  useEffect(() => {
    // DEBUG: use this code to prove to yourself that when the 
    // Details screen loads, route.params.selectedPokemon contains the 
    // data sent by the previous screen
    console.log(route.params.selectedItem)
  }, [])

  const addFavoriteCountry = async () => {
    try {
      const countryName = selectedItem.name.common;
  
      const favcontryinDB = collection(db, "favoriteCountries");  
      const q = query(favcontryinDB, where("name", "==", countryName));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        console.log('Sorry! Country is already in your favorites!!!');
        alert(`Sorry! ${countryName} is already in your favorites!!!`);
      } else {
        // Save the selected country as a favorite in Firestore
        const insertedDocument = await addDoc(favcontryinDB, {
          name: countryName,
          capital: selectedItem.capital?.[0],
          population: selectedItem.population,
          area: selectedItem.area,
          flag: selectedItem.flags?.png
        });
  
        console.log('Country added to favorites successfully!');
        console.log("Document written with ID: ", insertedDocument.id);
        alert(`done! ${insertedDocument.id}`);
      }
    } catch (error) {
      console.error('Error adding country to favorites:', error);
    }
  };
  
const btnDonePressed = () => {
  console.log("going back")
  // Example of how to programatically navigate back to the previous screen
  navigation.goBack()
}


return (
  <View style={styles.container}>
    <Text style={styles.heading}>{selectedItem.name.common}</Text>
    <Text style={styles.label}>Capital: {selectedItem.capital?.[0]}</Text>
    <Text style={styles.label}>Population: {selectedItem.population?.toLocaleString()}</Text>
    <Text style={styles.label}>Area: {selectedItem.area?.toLocaleString()} sq km</Text>
    <Image
      source={{ uri: selectedItem.flags?.png }}
      style={styles.flagImage}
      resizeMode="contain"
    />

    <MapView
      style={styles.map}
      initialRegion={{
        latitude: selectedItem.capitalInfo.latlng[0],
        longitude: selectedItem.capitalInfo.latlng[1],
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
    >
      <Marker
        coordinate={{ latitude: selectedItem.capitalInfo.latlng[0], longitude: selectedItem.capitalInfo.latlng[1], }}
        title={selectedItem.capital?.[0]}
      />
    </MapView>


    <Button title="Favorite this Country?" onPress={addFavoriteCountry} />
    <Button title="Done!" onPress={btnDonePressed} />
  </View>
);
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  flagImage: {
    width: 100,
    height: 70,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
  },
};
