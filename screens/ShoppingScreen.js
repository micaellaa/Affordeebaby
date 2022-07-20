import { useNavigation } from "@react-navigation/core";
//import { signOut } from 'firebase/auth';
import React from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
//import { TouchableOpacity } from "react-native";
import { authentication } from "../firebase/firebase-config";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
//import { TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { TouchableOpacity } from "react-native-gesture-handler"; // took out TextInput
import COLORS from "../consts/colors";
import products from "../consts/products";
import Icon from "react-native-vector-icons/MaterialIcons";
import discounts from "../consts/discounts";

const width = Dimensions.get("window").width / 2 - 30;

const ShoppingScreen = () => {
  const navigation = useNavigation();
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const categories = ["POPULAR", "TOPS", "BOTTOMS", "DRESSES"];
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

          <View style={styles.productDetailsPriceContainer}>
            <Text style={styles.productDetailsPriceText}>${product.price}</Text>
            <View style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.containerShoppingScreen}>
        <View>
          <Text style={styles.headerText1}>Welcome to</Text>
          <Text style={styles.headerText2}>Product Shop</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 800 }}>
        <Icon
          name="shopping-cart"
          size={28}
          onPress={() => navigation.navigate("AllCarts")}
        />
        <Icon name="settings" size={28} />
      </View>
      <View style={{ paddingHorizontal: 80 }}>
        <Text style={{ fontWeight: "bold" }}>Discount applied:</Text>
      </View>
      <View
        style={{ marginTop: 30, flexDirection: "row", paddingHorizontal: 50 }}
      >
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        <View style={styles.sortBtn}>
          <Image
            style={styles.cartDimensions}
            source={require("../assets/bell-icon2.png")}
          />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
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
  discMinSpendText: { fontSize: 19, fontWeight: "bold" },
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
});
