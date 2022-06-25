import { useNavigation } from '@react-navigation/core'
import { signOut } from 'firebase/auth';
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { authentication } from "../firebase/firebase-config";

const RetailersScreen = () => {
  
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Zara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quickshop")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>ASOS</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default RetailersScreen

const styles = StyleSheet.create({
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
})