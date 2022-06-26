import { View, Text, Flatlist, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, firebase } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { ImageBackground, TouchableOpacity } from "react-native";
import { firestore } from "../firebase/firebase-config";

const OtherUserProfileScreen = (userUID) => {
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
        <TouchableOpacity onPress={quickShop} style={styles.button}>
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
});
