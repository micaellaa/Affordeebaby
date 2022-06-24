import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
//import { auth } from '../firebase'
import {
  authentication,
  createUserDocument,
} from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
//import { useEffect } from 'react/cjs/react.production.min';
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../consts/colors";

const RegisterScreen = () => {
  const [firstName, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNum, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    return onAuthStateChanged(authentication, (user) => {
      if (user) {
        navigation.replace("Home"); //diff between .replace and .navigate
      }
    });
  }, []);

  const handleRegister = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        createUserDocument(user, [firstName, username, mobileNum]);
      })
      .catch((error) => alert(error.message));
  };

  return (
    //<Image source={require('../assets/palmshadow-bg.png')}/>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.iconContainer}>
        <Image
          style={styles.iconDimensions}
          source={require("../assets/logogradientstroke.png")}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setName(text)} //a lambda
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)} //a lambda
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile Number"
          value={mobileNum}
          onChangeText={(text) => setNumber(text)} //a lambda
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)} //a lambda
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)} //why is it set to password
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subtextContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={[styles.subtext, styles.subtextSelected]}>
            Already Registered? Log in instead
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconDimensions: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white", //grey
    addingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.indigo,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white", //grey
    marginTop: 5,
    borderColor: COLORS.indigo,
    borderwidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: COLORS.indigo,
    fontWeight: "700",
    fontSize: 16,
  },
  subtextContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  subtext: {
    fontsize: 5,
    color: "grey",
    fontWeight: "bold",
  },
  subtextSelected: {
    color: COLORS.indigo,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.indigo,
  },
});
