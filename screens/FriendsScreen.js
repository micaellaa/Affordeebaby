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

const width = Dimensions.get("window").width / 2 - 30;

const FriendsScreen = () => {
  const navigation = useNavigation();

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

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("OtherUserProfile", friendID)}
      >
        <View style={styles.card}>
          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg.png")} //stub image
      style={styles.container}
    >
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

export default FriendsScreen;

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "space-between",
    backgroundColor: "#0782F9",
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
    justifyContent: "flex-start",
  },
  header1Font: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 50,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.indigo,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderColor: COLORS.indigo,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.white,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.indigo,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
