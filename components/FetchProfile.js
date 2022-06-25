import { View, Text, Flatlist, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, firebase } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const FetchProfile = () => {
  const [users1, setUsers1] = useState("");

  const user = authentication.currentUser;
  const userUID = user.uid;

  if (!user) return;

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
  /*useEffect(async () => {
    usersRef.onSnapshot((querySnapshot) => {
      const users1 = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        users1.push({
          id: doc.id,
          heading,
          text,
        });
      });
      setUsers1(users1);
    });
  }, []);*/

  /*
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    uN = docSnap.get(firstName);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    uN = "User Not Found";
  }*/

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text style={StyleSheet.itemHeading}>Hi, {users1}!</Text>
    </View>
  );
};

export default FetchProfile;

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
