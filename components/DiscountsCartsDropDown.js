import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { firestore } from "../firebase/firebase-config";
import { authentication } from "../firebase/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import SelectDropdown from "react-native-select-dropdown";
import COLORS from "../consts/colors";
//import { updateCartDocument } from "../functions/updateCartDocument";

const DiscountsCartsDropdown = (discountID) => {
  const [value, setValue] = useState(""); //fix infinite loop
  const [cartsList, setCarts] = useState([]);

  const user = authentication.currentUser;
  const userUID = user.uid;

  if (!user) return;

  /*
  const cartConverter = {
    toFirestore: (cart) => {
      return {
        name: cart.cartname,
        products: cart.productsID,
        users: cart.usersid,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return data.cartname;
    },
  };*/

  const usersRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchUserCarts() {
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        console.log("try entered");
        const cartsList = docSnap.get("carts");
        setCarts(cartsList);
      } catch (error) {
        console.log("Error in finding carts", error);
      }
    }
    fetchUserCarts();
  }, [value]);

  //const cartsList = docSnap.get("carts");
  const cartsData = cartsList;
  console.log("cartsData: ", cartsData);

  const addDiscountToCart = (cartID, discountID) => {
    navigation.navigate('Cart', {cartID: cartID, discountID: discountID});
  };

  return (
    <SelectDropdown
      data={cartsData}
      onSelect={(selectedItem, index) => {
        addDiscountToCart(selectedItem, discountID);
      }}
      defaultButtonText={"add to cart"}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonStyle={styles.dropdown3BtnStyle}
      rowStyle={styles.dropdown3RowStyle}
    />
  );
};

export default DiscountsCartsDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  dropdown3BtnStyle: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdown3RowStyle: {
    backgroundColor: "slategray",
    borderBottomColor: "#444",
    height: 50,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
// dropdown link: https://reactnativeexample.com/a-highly-customized-dropdown-select-picker-menu-for-react-native/
