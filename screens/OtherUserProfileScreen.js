import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, firebase } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { ImageBackground, TouchableOpacity } from "react-native";
import { firestore } from "../firebase/firebase-config";
import COLORS from "../consts/colors";

const OtherUserProfileScreen = ({ navig, route }) => {
  const navigation = useNavigation();

  const userUID = route.params;

  const [users1, setUsers1] = useState("");

  const usersRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchProfileData() {
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        console.log("try entered");
        const fN = docSnap.get("firstName");
        setUsers1(fN);
        console.log("docSnap.firstName: ", docSnap.get("firstName"));
        console.log("users1: ", users1);
      } catch (error) {
        console.log("Error in finding profile", error);
      }
    }
    fetchProfileData();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg.png")} //stub image
      style={styles.container}
    >
      <View style={{ flex: 1, marginTop: 100 }}>
        <Text style={StyleSheet.itemHeading}>{users1}'s Profile</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send friend request!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OtherUserProfileScreen;

const styles = StyleSheet.create({
  containerFetch: {
    backgroundColour: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItem: "center",
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemHeading: {
    fontWeight: 300,
  },
  searchbarContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "space-between",
    backgroundColor: "#0782F9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
