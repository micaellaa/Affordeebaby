import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native';
import COLORS from '../consts/colors';
import Searchbar from '../components/Searchbar';

const FindFriendsScreen = () => {
  
  const navigation = useNavigation()

  //top menu constants
  const menuOptions = ['Shop', 'Profile', 'Find Friends'];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(0);

  //searchbar constants
  const [value, setValue] = useState();
  function updateSearch(value) {
    // search logic
  }

  return (
    <ImageBackground
      source={require('../assets/palmshadow-bg.png')} //stub image
      style={styles.container}
    >
      <View style={styles.menuContainer}> 
        {menuOptions.map((item, index) => (
          <TouchableOpacity 
            key={index}
            activeOpacity={0.8}
            onPress={()=> {setMenuOptionsIndex(index)
              if (index == 0) {
                navigation.navigate("Home"); // stub
              } 
              if (index == 1) {
                navigation.navigate("Profile");
              }
            }}>
            <Text
            style={[
              styles.menuOptionsText,
              menuOptionsIndex == index && styles.menuOptionsTextSelected,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuContainer}>
        <Searchbar
          value={value}
          updateSearch={updateSearch}
          style={{}}
        />
      </View>

    <View style = {styles.container}></View>

    </ImageBackground>
  )
}

export default FindFriendsScreen;

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'space-between',
    backgroundColor: '#0782F9',
  
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
// swipescreen: https://www.youtube.com/watch?v=Sb9paeF2SQs