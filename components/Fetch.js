/*import { View, text, Flatlist, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../firebase/firebase-config";
//import "firebase/firestore";
import "firebase/compat/firestore";
import { doc } from "firebase/firestore";

const Fetch = () => {
  const [users1, setUsers1] = useState([]);
  const usersRef = firebase.firestore().collection("users");

  useEffect(async () => {
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
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Flatlist
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={StyleSheet.container}>
            <View style={StyleSheet.innerContainer}>
              <Text style={StyleSheet.itemHeading}>{item.heading}</Text>
              <Text style={StyleSheet.itemText}>{item.teading}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
  container: {
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
