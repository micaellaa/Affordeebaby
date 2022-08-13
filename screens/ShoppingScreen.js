import { useNavigation } from "@react-navigation/core";
//import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
//import { TouchableOpacity } from "react-native";
import { authentication } from "../firebase/firebase-config";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
//import { TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { TouchableOpacity } from "react-native-gesture-handler"; // took out TextInput
import COLORS from "../consts/colors";
import products from "../consts/products";
import Icon from "react-native-vector-icons/MaterialIcons";
import discounts from "../consts/discounts";
import ShoppingSearchBar from "../components/ShoppingSearchBar";
import ShoppingSearchList from "../components/ShoppingSearchList";

const width = Dimensions.get("window").width / 2 - 30;

const ShoppingScreen = ({ route }) => {
  const discountId = route.params;
  const navigation = useNavigation();
  // for search bar
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // get data from the fake api endpoint
  const fakeData = products;

  // product categories
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = ["ALL", "TOPS", "BOTTOMS", "DRESSES"];
  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const DiscountCard = ({ discountId }) => {
    if (discountId) {
      const appliedDisc = discounts.find((elem) => elem.id == discountId);
      return (
        <View style={styles.discountCard}>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.space1}></View>
          </View>

          <View style={styles.discountContainer}>
            <Image source={appliedDisc.img} style={styles.discImage} />
          </View>

          <Text style={styles.discountNameText}>{appliedDisc.name}</Text>
          <View style={styles.discountDetailsCont}>
            <Text style={styles.discMinSpendText}>
              Minimum Spend: ${appliedDisc.minspend}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Discounts")}
            >
              <View style={styles.discApplyButton}>
                <Text style={styles.discApplyText}> EDIT </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Quickshop", null)}
            >
              <View style={styles.discRemoveButton}>
                <Text style={styles.discApplyText}>REMOVE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.discountContainer}>

          <Text>No Discount Applied</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Discounts")}
          >
            <View style={styles.discApplyButton}>
              <Text style={styles.discApplyText}> EDIT </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const Card = ({ product }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", product)}
      >
        <View style={styles.cardContainer}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: product.like
                  ? "rgba(245, 42, 42,0.2)"
                  : "rgba(0,0,0,0.2) ",
              }}
            >
              <Icon
                name="favorite"
                size={18}
                color={product.like ? COLORS.red : COLORS.black}
              />
            </View>
          </View>

          <View style={styles.productDetailsContainer}>
            <Image source={product.img} style={styles.productImg} />
          </View>

          <Text style={styles.productDetailsText}>{product.name}</Text>

          <View style={styles.bottomrow}>
            <Text style={styles.productDetailsPriceText}>
              ${product.price.toFixed(2)}
            </Text>
            <View style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const menuOptions = ["Shop", "Profile", "Find Friends"];
  const [menuOptionsIndex, setMenuOptionsIndex] = useState(2);

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
      <View>
        <DiscountCard discountId={discountId}/>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("AllCarts", discountId)}>
          <Image
            style={styles.notifDimensions}
            source={require("../assets/bell-icon2.png")}
          />
        </TouchableOpacity>

        <ShoppingSearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Image
            style={styles.notifDimensions}
            source={require("../assets/cart-icon2.png")}
          />
        </TouchableOpacity>
      </View>

      <CategoryList />

      <View
        style={{
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FlatList
          ScrollView={styles.scrollView}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 500, //controls bouncing back of scrolling
          }}
          numColumns={2}
          data={products}
          renderItem={({ item }) => {
            if (item.categoryno == catergoryIndex || catergoryIndex == 0) {
              return <Card product={item} />;
            }
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({
  productImg: {
    width: 150,
    height: 150,
    flex: 1,
    resizeMode: "contain",
  },
  productDetailsContainer: {
    height: 100,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  productDetailsText: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
  productDetailsPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  productDetailsPriceText: { fontSize: 19, fontWeight: "bold" },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  addButton: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.indigo,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: "bold",
  },

  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: COLORS.indigo,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderColor: COLORS.indigo,
  },
  cardContainer: {
    flex: 1,
    height: 225,
    backgroundColor: "white",
    width: 150,
    borderRadius: 10,
    marginBottom: 20,
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
  headerText1: { fontSize: 25, fontWeight: "bold", paddingHorizontal: 50 },
  headerText2: {
    fontSize: 38,
    color: COLORS.indigo,
    fontWeight: "bold",
    paddingHorizontal: 50,
  },
  containerShoppingScreen: {
    flex: 3,
    paddingHorizontal: 50,
    backgroundColor: COLORS.white,
  },
  cartDimensions: {
    width: 40,
    height: 40,
  },
  discountContainer: {
    height: 100,
    alignItems: "center",
  },

  discImage: {
    width: 600,
    height: 200,
    flex: 1,
  },
  discountNameText: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    paddingHorizontal: 50,
  },
  discountDetailsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 50,
  },
  discMinSpendText: { fontSize: 15, fontWeight: "bold" },
  discApplyButton: {
    height: 25,
    width: 50,
    backgroundColor: COLORS.indigo,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  discRemoveButton: {
    height: 25,
    width: 70,
    backgroundColor: COLORS.indigo,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  discApplyText: { color: COLORS.white, fontWeight: "bold" },
  discImage: {
    width: 300,
    height: 100,
    flex: 1,
    resizeMode: "contain",
  },

  scrollView: {
    height: "20%",
    width: "80%",
    margin: 20,
    alignSelf: "center",
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
  },
  notifDimensions: {
    width: 40,
    height: 40,
  },
  bottomrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  menuContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 60,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  menuOptionsText: {
    fontsize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  menuOptionsText1: {
    fontsize: 16,
    color: "white",
    fontWeight: "bold",
  },
  menuOptionsTextSelected: {
    color: COLORS.indigo,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.indigo,
  },
});
