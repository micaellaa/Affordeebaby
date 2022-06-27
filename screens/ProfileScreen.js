import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { authentication, fetchProfile } from "../firebase/firebase-config";
import {
  initializeFirestore,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import COLORS from "../consts/colors";
import FetchProfile from "../components/FetchProfile";

/*//authentication for profile
const user = authentication.currentUser;
const userUID = user.uid;

const userRef = doc(db, "users", userUID);

try {
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const firstName = docSnap.get(firstName);
  } else {
    // doc.data() will be undefined in this case
    console.log("Cannot find user. Try again later.");
    const firstName = "unknown";
  }
} catch (error) {
  console.log("Error in finding user", error);
}
*/

const ProfileScreen = () => {
  const navigation = useNavigation();

  //top menu constants
  const menuOptions = ["Shop", "Profile", "Find Friends"];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(0);

  //authentication for profile
  const user = authentication.currentUser;
  const userUID = user.uid;

  //console.log(currentFirstName);

  //var profile = fetchProfile(user);
  //console.log(fetchProfile(user));

  // prettier-ignore

  return (
    
    <ImageBackground
      source={require("../assets/palmshadow-bg.png")} //stub image
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

    <FetchProfile/>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllCarts")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Carts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.navigate("AllCarts")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Friend Requests</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
