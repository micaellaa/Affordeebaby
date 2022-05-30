import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native-web';
//import { auth } from '../firebase'
import { authentication } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
//import { useEffect } from 'react/cjs/react.production.min';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import COLORS from '../consts/colors';

const LoginScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') //useState() 
  //const auth = getAuth();

  const navigation = useNavigation()

  //
/*
  const useFirebaseAuthentication = (firebase) => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(authentication, 
          authUser => {
            if (authUser) {
              navigation.replace("Home")
            }
            authUser
              ? setAuthUser(authUser)
              : setAuthUser(null);
          },
      );
      return () => {
        unsubscribe();
      }
    }, []);

    return authUser
  }
  */
  

  useEffect(() => {
    return onAuthStateChanged(authentication, user => {
      if (user) {
        navigation.replace("Home") //diff between .replace and .navigate
      }
    })
  }, [])

  /*
  const useFirebaseAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      const unlisten = onAuthStateChanged(authentication, 
        user => {
          if (user) {
            navigation.navigate("Home")
          }
        }
      );
      return () => {
        unlisten();
      }
    }, []);
    return authUser
  }
  */



  // SIGN-UP
  /*const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message))
  }*/

  const handleSignUp = () => {
    navigation.replace("Register")
  }


  // SIGN-IN
  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        setIsSignedIn(true);
        console.log('Signed in with: ', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (
    //<Image source={require('../assets/palmshadow-bg.png')}/>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.iconContainer}>  
        <Image 
          style={styles.iconDimensions}
          source={require('../assets/logogradientstroke.png')}/>
      </View>

      <View style={styles.inputContainer}>  
        <TextInput
          placeholder= "Email"
          value={email}
          onChangeText={text => setEmail(text)} //a lambda
          style={styles.input}
        />
        <TextInput
          placeholder= "Password"
          value={password}
          onChangeText={text => setPassword(text)} //why is it set to password
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconDimensions: {
    width: 150, 
    height: 150
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer:{
    width: '80%'
  },
  input:{
    backgroundColor: "white", //grey
    addingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button:{
    backgroundColor: COLORS.indigo,
    width: '100%',
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonOutline:{
    backgroundColor: "white", //grey
    marginTop: 5,
    borderColor: COLORS.indigo,
    borderwidth: 2,
  },
  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText:{
    color: COLORS.indigo,
    fontWeight: '700',
    fontSize: 16,
  },
})
