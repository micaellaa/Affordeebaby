import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
} from "react-native";
import { ImageBackground, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";

const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height;

const RetailersScreen = () => {
  const navigation = useNavigation();

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Zara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quickshop")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>ASOS</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RetailersScreen;

const styles = StyleSheet.create({
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  notifDimensions: {
    width: 40,
    height: 40,
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
