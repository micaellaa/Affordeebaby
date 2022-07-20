import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { authentication } from "../firebase/firebase-config";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const shopByRetailer = () => {
    navigation.navigate("Retailers");
  };

  const quickShop = () => {
    navigation.navigate("Quickshop", null);
  };

  /*const manageOrders = () => {
    navigation.navigate("Quickshop")
*/
  const goToDiscounts = () => {
    navigation.navigate("Discounts");
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

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={quickShop}
          style={styles.touchable}
          activeOpacity={0.6}
        >
          <Image
            style={styles.img}
            source={require("../assets/home_dress.jpg")}
          />
          <View style={styles.view}>
            <Text style={styles.text}>Quickshop</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Retailers")}
          style={styles.touchable}
          activeOpacity={0.6}
        >
          <Image
            style={styles.img}
            source={require("../assets/home_heels.jpg")}
          />
          <View style={styles.view}>
            <Text style={styles.text}>Shop by Retailer</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToDiscounts}
          style={styles.touchable}
          activeOpacity={0.6}
        >
          <Image
            style={styles.img}
            source={require("../assets/home_purse.jpg")}
          />
          <View style={styles.view}>
            <Text style={styles.text}>Discounts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttons: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: height * 0.5,
    width: width,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "transparent",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonRow: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
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
  buttonWImg: {
    width: 30,
    height: 30,
  },
  buttonImg: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  img: {
    flex: 1,
    width: width,
    height: 30,
    resizeMode: "cover",
    //borderRadius: 10,
  },
  view: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: 30,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
});
