import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const FetchProfile = () => {
  const [firstName1, setfirstName1] = useState("");
  const [username1, setusername1] = useState("");

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
        const uN = docSnap.get("username");
        setfirstName1(fN);
        setusername1(uN);
        console.log("docSnap.firstName: ", docSnap.get("firstName"));
        console.log("firstName1: ", firstName1);
      } catch (error) {
        console.log("Error in finding profile", error);
      }
    }
    fetchProfileData();
  }, []);
  /*useEffect(async () => {
    usersRef.onSnapshot((querySnapshot) => {
      const firstName1 = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        firstName1.push({
          id: doc.id,
          heading,
          text,
        });
      });
      setfirstName1(firstName1);
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
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text style={styles.itemHeading}>{firstName1}</Text>
      <Text style={styles.itemSubHeading}>@{username1}</Text>
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
    fontSize: 30,
    color: "white",
    fontFamily: "HelveticaNeue-BoldItalic",
    flexShrink: 1,
  },
  itemSubHeading: {
    fontSize: 20,
    color: "white",
    fontFamily: "HelveticaNeue-LightItalic",
    flexShrink: 1,
  },
});
