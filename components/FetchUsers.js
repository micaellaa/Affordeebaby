import { View, Text, Flatlist, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, firebase } from "../firebase/firebase-config";
import "firebase/firestore";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const FetchUsersBasedOnSearch = () => {
  const [users1, setUsers1] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");

  const q = query(
    collection(firestore, "users"),
    where("username", "==", usernameInput)
  );

  useEffect(() => {
    async function fetchUsers() {
      /*usersRef.onSnapshot((querySnapshot) => {
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
    });*/
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const { email, firstName, mobileNum, username } = doc.data();
        users1.push({
          id: doc.id,
          email,
          firstName,
          mobileNum,
          username,
        });
      });
      setUsers1(users1);
    }

    fetchUsers();
  });

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Flatlist
        style={{ height: "100%" }}
        data={users1}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={StyleSheet.container}>
            <View style={StyleSheet.innerContainer}>
              <Text style={StyleSheet.itemHeading}>{item.firstName}</Text>
              <Text style={StyleSheet.itemText}>{item.username}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default FetchUsersBasedOnSearch;

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
