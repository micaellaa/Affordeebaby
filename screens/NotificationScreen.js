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
import { acceptFriendRequest } from "../functions/acceptFriendRequest";

const width = Dimensions.get("window").width / 2 - 30;

const NotificationScreen = () => {
  const navigation = useNavigation();

  //get array of cart ids
  const [friendReqs1, setFriendReqs1] = useState("");

  const user = authentication.currentUser;
  const userUID = user.uid;
  const userRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchFriendRequests() {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        const fq = docSnap.get("friendRequests");
        setFriendReqs1(fq);
      } catch (error) {
        console.log("Error in finding friend requests", error);
      }
    }
    fetchFriendRequests();
  }, []);

  console.log("FriendReqs1: ", friendReqs1);

  const Card = ({ senderID }) => {
    if (senderID == "") return null;
    const [name, setName] = useState("");
    console.log("senderID into Card:", senderID);
    const senderRef = doc(firestore, "users", senderID);

    useEffect(() => {
      async function fetchUser() {
        const docSnap = await getDoc(senderRef);
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
        >
          <TouchableOpacity
            style={{
              height: 30,
              width: 70,
              backgroundColor: COLORS.indigo,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              acceptFriendRequest(senderID);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const menuOptions = ["Shop", "Profile", "Find Friends"];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(0);

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg2.jpg")} //stub image
      style={styles.container}
    >
      <View style={styles.barContainer}>
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
                navigation.navigate("Profile"); // stub
              }
              if (index == 2) {
                navigation.navigate("FindFriends");
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

      <View style={styles.barContainer2}>
        <TouchableOpacity onPress={() => navigation.navigate("AllCarts")}>
          <Image
            style={styles.notifDimensions}
            source={require("../assets/bell-icon2.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Image
            style={styles.notifDimensions}
            source={require("../assets/cart-icon2.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header1}>
        <Text style={styles.header1Font}>Friend Requests</Text>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={friendReqs1}
        renderItem={({ item }) => {
          return <Card senderID={item} />;
        }}
      />
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
  barContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 60,
    marginBottom: 30,
    justifyContent: "space-between",
  },
  barContainer2: {
    flexDirection: "row",
    width: "80%",
    marginBottom: 10,
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
    alignSelf: "center",
    color: COLORS.indigo,
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
    justifyContent: "flex-start",
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
  notifDimensions: {
    width: 40,
    height: 40,
  },
});
