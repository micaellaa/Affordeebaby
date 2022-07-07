import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
//import products from '../consts/products';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import CartsDropdown from "../components/CartsDropdown";

const DetailsScreen = ({ navigation, route }) => {
  //const navigation = useNavigation();
  //const route = useRoute();
  const product = route.params;
  console.log(product.id);
  /*
  const addNewOrder = async (cartID, productID) => {
    const cartsRef = doc(firestore, "carts", cartID);
    try {
      if (!cartsRef) {
        console.log("try entered with: " + user.uid);
        await setDoc(doc(firestore, "carts", cartID), {
          productsID: [productID],
          sharersID: [user.id],
        });
        console.log("user data added");
      } else {
        await updateDoc(cartsRef, {
          productsID: arrayUnion(productID),
        });
      }
    } catch (error) {
      console.log("Error in creating order", error);
    }
  };*/

  //add to cart function using async
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      //itemArray = array;

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Quickshop");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Quickshop");
      } catch (error) {
        return error;
      }
    }
  };

  /*
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Quickshop");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Quickshop");
      } catch (error) {
        return error;
      }
    }
  };
  */
  // prettier-ignore
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon
          name="shopping-cart"
          size={28}
          onPress={() => navigation.navigate("Cart")}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={product.img}
          style={{ width: 300, height: 300, resizeMode: "contain", flex: 1 }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View style={styles.line} />
          <Text style={styles.reviewFont}>Best choice</Text>
        </View>
        <View
          style={styles.price}
        >
          <Text style={styles.nameFont}>
            {product.name}
          </Text>
          <View style={styles.priceTag}>
            <Text
              style={styles.priceFont}
            >
              ${product.price}
            </Text>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutFont1}>About</Text>
          <Text
            style={styles.aboutFont2}>
            {product.about}
          </Text>
          <View
            style={styles.quantityContainer}
          >
            <View
              style={styles.quantityContainer2}
            >
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>-</Text>
              </View>
              <Text
                style={styles.quantityText}
              >
                1
              </Text>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>+</Text>
              </View>
            </View>

            <View style={styles.buyBtn}>
            <CartsDropdown productID = {product.id}/> 
              
            </View>
          </View>
          
        </View>
      </View>
    </View>
  );
};
// what's the product ID ah

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priceFont: {
    marginLeft: 15,
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  price: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewFont: { fontSize: 18, fontWeight: "bold" },
  nameFont: { fontSize: 22, fontWeight: "bold" },
  aboutFont1: { fontSize: 20, fontWeight: "bold" },
  aboutFont2: {
    color: "grey",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  aboutContainer: { paddingHorizontal: 20, marginTop: 10 },
  quantityContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityContainer2: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default DetailsScreen;

/* fion's add to cart button
<TouchableOpacity
                onPress={() => addNewOrder(product.id)} // to test if navigation working
                style={styles.buyBtn}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  add to cart
                </Text>
              </TouchableOpacity>
              */
