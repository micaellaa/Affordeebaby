import { useNavigation } from '@react-navigation/core'
import { signOut } from 'firebase/auth';
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { authentication } from "../firebase/firebase-config";

const ShoppingScreen = () => {
  
  const navigation = useNavigation()
  
  return (
    <View>
      <Text>Shoppingscreen</Text>
    </View>
  )
}
  
export default ShoppingScreen;

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
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})