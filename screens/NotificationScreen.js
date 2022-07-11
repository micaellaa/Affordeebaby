import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { authentication, fetchProfile } from "../firebase/firebase-config";
import {
  initializeFirestore,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import COLORS from "../consts/colors";
import FetchProfile from "../components/FetchProfile";

const NotificationScreen = () => {
  const navigation = useNavigation();

  //authentication for profile
  const user = authentication.currentUser;
  const userUID = user.uid;

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg.png")} //stub image
      style={styles.container}
    >
      <View style={styles.header1}>
        <Text style={styles.header1Font}>Friend Requests</Text>
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "space-between",
    backgroundColor: "#0782F9",
  },
  container: {
    flex: 3,
    paddingHorizontal: 50,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.indigo,
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  menuContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 30,
    marginBottom: 40,
    justifyContent: "space-between",
  },
  menuOptionsText: {
    fontsize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  menuOptionsTextSelected: {
    color: COLORS.indigo,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.indigo,
  },
  header1: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header1Font: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 50,
  },
});
