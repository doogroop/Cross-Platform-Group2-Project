import { Button, FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Linking from 'expo-linking';


const GameScreen = ({ navigation, route, game, SearchGameID, store }) => {
    const { gameID } = route.params
    const [title, setTitle] = useState("")
    //This URL is the Redriect that the api uses THIS IS PROVIDED BY THE API meaning they get a cut of the money spent.
    //https://www.cheapshark.com/redirect?dealID=

    useEffect(() => {
        fetch("https://www.cheapshark.com/api/1.0/games?id=" + gameID)
            .then((res) => res.json())
            .then((json) => {
                SearchGameID(json, store)
                setTitle(json.info.title)
            })
    }, [])

    const GameResults = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => Alert.alert('Confirm', 'You are about to leave the app', [{
                text: 'Okay',
                onPress: () => {
                    Linking.openURL("https://www.cheapshark.com/redirect?dealID=" + item.dealID)
                },
              },
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('No was pressed');
                },
              }])}>
                <View style={styles.item}>
                    <Text>Store: {item.storeName}</Text>
                    <Text>Current Price: {item.price}</Text>
                    <Text>Retail Price: {item.retailPrice}</Text>
                </View> 
            </TouchableHighlight>
        )
           
            
    }

    return (
        <View>
            <Text style={{ textAlign: "center" }}>{title}</Text>
            <FlatList data={game.deals} renderItem={GameResults} />
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        margin: 5,
        borderColor: 'black',
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white'
    },
    input: {
        height: 44,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
    },

});

export default GameScreen