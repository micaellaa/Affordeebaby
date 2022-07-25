import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import COLORS from "../consts/colors";
import FetchProfile from "../components/FetchProfile";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ChooseAvatarScreen = () => {
  const navigation = useNavigation();

  //top menu constants
  const menuOptions = ["Shop", "Profile", "Find Friends"];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(0);

  //authentication for profile
  const user = authentication.currentUser;
  const userUID = user.uid;

  return (
    <ImageBackground
      source={require("../assets/palmshadow-bg.png")} //stub image
      style={styles.container}
    ></ImageBackground>
  );
};

export default ChooseAvatarScreen;

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
  avatarDimensions: {
    width: 150,
    height: 150,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "white",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.indigo,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.indigo,
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
  bottomContainer: {
    width: "80%",
    marginTop: 30,
    marginBottom: 40,
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
});
