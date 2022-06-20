import { useNavigation } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native';
import { ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { authentication } from "../firebase/firebase-config";
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import background from "../assets/palmshadow-bg.png";


const HomeScreen = () => {
  
  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(authentication)
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  const shopByRetailer = () => {
    navigation.navigate("Retailers")
  }

  const quickShop = () => {
    navigation.navigate("Quickshop")
  }

  /*const manageOrders = () => {
    navigation.navigate("Quickshop")

  const discounts = () => {
    navigation.navigate("Discounts")
  }*/

  const menuOptions = ['Shop', 'Profile', 'Find Friends'];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(0)

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
            onPress={()=>setMenuOptionsIndex(index)}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={quickShop}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Quick Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Retailers")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText}>Shop by Retailer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={manageOrders}
          style={[styles.button, styles.buttonOutline]} 
        >
          <Text style={styles.buttonText}>Manage My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={manageOrders}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText}>Discounts</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        <Text>Email: {authentication.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: COLORS.indigo,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonContainer:{
    flex: 1,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
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