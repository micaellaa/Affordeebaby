import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import COLORS from '../consts/colors';

export default function Searchbar({ value, updateSearch, style }) {
    
    const [query, setQuery] = useState();
    
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image 
                    //resizeMode='center'
                    style={styles.searchIcon}
                    source={require('../assets/blue-search-icon.png')}/>
                <TextInput
                    value={query}
                    placeholder="Key in your friend's username"
                    style={styles.textInput}
                    onChangeText={(text) => {
                        /*var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 12)
                            setError("Query too long.")
                        else if (text.match(letters)) {
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else setError("Please only enter alphabets")*/
                        setQuery(text);
                        updateSearch(text);
                    }}
                />
                { query ?
                    <TouchableOpacity
                        onPress={() => setQuery('')}
                        style={styles.vwClear}>
                        <Image
                            style={styles.backspaceIcon}
                            source={require('../assets/backspace-icon.png')} />
                    </TouchableOpacity>
                    : <View style={styles.vwClear} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 40,
        // backgroundColor: 'red'
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },
    searchIcon: {
        height: 30,
        width: 30,
        margin: 5,
    }, 
    backspaceIcon: {
        height: 22,
        width: 22,
        margin: 5,
    }, 
    searchContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row'
    },
    searchbarContainer: {
      height: '30%',
      backgroundColor: '#0782F9',
      borderRadius: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonContainer:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    menuContainer: {
      flexDirection: 'row',
      width: '80%',
      marginTop: 30,
      marginBottom: 40,
      justifyContent: 'space-between',
    },
    menuOptionsText: {
      fontsize: 16,
      color: 'grey',
      fontWeight: 'bold',
    },
    menuOptionsTextSelected: {
      color: COLORS.indigo,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.indigo,
    },
  })