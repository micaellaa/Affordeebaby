/*import { View, text, Flatlist, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, get } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const FetchProfile = async (user) => {
  const [users1, setUsers1] = useState([]);
  const usersRef = doc(firestore, "users", user.id);
  const docSnap = await getDoc(usersRef);

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
    const uN = docSnap.get(firstName);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    const uN = "User Not Found";
  }

  return (
    /*<View style={{ flex: 1, marginTop: 100 }}>
      <Flatlist
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={StyleSheet.containerFetch}>
            <View style={StyleSheet.innerContainer}>
              <Text style={StyleSheet.itemHeading}>{uN}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>*/
//docSnap.data()
/*docSnap.get(firstName)
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

*/
