import { StyleSheet, Text, View, FlatList, Image, Pressable, Platform } from 'react-native';
import { useState, useEffect } from "react"


// Data for the FlatList
const POKEMON = [
    { id: 132, name: "Ditto", type: "jelly", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" },
    { id: 10, name: "Caterpie", type: "bug", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png" },
    { id: 23, name: "Arbok", type: "bug", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png" },
    { id: 70, name: "Bellsprout", type: "grass", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png" },
    { id: 25, name: "Pikachu", type: "electric", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
]
const MyComponent = () => {
    // passing in [] as a parameter will cause useEffect() to
    // execute the first time the component loads (but not anytime after)

    return (
        <View></View>
    )
}

export default function ListScreen({ navigation }) {
    const [worldCountriListAPI, setworldCountriListAPI] = useState([])


    useEffect(async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/independent?status=true")
            // json is an object that contains a title, description, and movies properties
            const data = await response.json();
            // json.movies is the property that contains a list of movies
            setworldCountriListAPI(data)
        } catch (error) {
            console.error(error);
        }
    }, [])
    // click handler function for a single row of the list
    const rowPressed = (data) => {

        // data = the information sent by the FlatList about the row that the user clicked on     
        console.log("rowPressed executed...")
        console.log(data)
        // data.item = contains the pokemon object from the data source associated with this row
        navigation.navigate("DetailsScreen", { selectedItem: data.item })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={worldCountriListAPI}
                renderItem={
                    // rowData parameter contains information about the current row
                    // that is being drawn on the screen.
                    (rowData) => {
                        // This is the UI for a row
                        // We make the row "clickable" by wrapping the UI in a <Pressable>                                    
                        return (
                            <Pressable onPress={() => { rowPressed(rowData) }}>
                                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                    <Image source={{ uri: rowData.item.flags?.png  }}
                                        style={{ height: 75, width: 75 }} />
                                    <View>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{rowData.item.name.official}</Text>
                                        <Text style={{ fontSize: 16 }}>Capital: {rowData.item.capital}</Text>
                                    </View>
                                </View>
                                
                            </Pressable>
                        )
                    }
                }
                keyExtractor={item => item.id}
                ItemSeparatorComponent={
                    // ItemSeparatorComponent is used to draw a "line" between each row
                    () => {
                        return (
                            <View
                                style={{ marginLeft: 0, borderWidth: 1, borderColor: "#ccc", marginVertical: 5 }}
                            />
                        )
                    }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
});
























