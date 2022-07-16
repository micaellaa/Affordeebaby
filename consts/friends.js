import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { removeFriend } from "../functions/removeFriend";

const allFriends = () => {
  friendsArray = [];

  //get array of cart ids
  const [friends1, setFriends1] = useState("");

  const user = authentication.currentUser;
  const userUID = user.uid;
  const userRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchFriends() {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        const fq = docSnap.get("friendships");
        setFriends1(fq);
      } catch (error) {
        console.log("Error in finding friends", error);
      }
    }
    fetchFriends();
  }, []);

  console.log("friends1: ", friends1);

  const Card = ({ friendID }) => {
    if (friendID == "") return null;
    const [name, setName] = useState("");
    console.log("friendID into Card:", friendID);
    const friendRef = doc(firestore, "users", friendID);

    useEffect(() => {
      async function fetchUser() {
        const docSnap = await getDoc(friendRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        }
        try {
          console.log("try entered");
          const fN = docSnap.get("firstName");
          setName(fN);
        } catch (error) {
          console.log("Error in finding User", error);
        }
      }
      fetchUser();
    }, []);

    //friendsArray.push({item: {name}, id: friendID})

    return null;
  };

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg2.jpg")} //stub image
      style={styles.container}
    >
      <View style={styles.menuContainer}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setMenuOptionsIndex(index);
              if (index == 0) {
                navigation.navigate("Home"); // stub
              }
              if (index == 1) {
                navigation.navigate("Profile");
              }
            }}
          >
            <Text
              style={[
                styles.menuOptionsText,
                menuOptionsIndex == index && styles.menuOptionsTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.header1}>
        <Text style={styles.header1Font}>Friends</Text>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={friends1}
        renderItem={({ item }) => {
          return <Card friendID={item} />;
        }}
      />
    </ImageBackground>
  );
};

export default allFriends;
