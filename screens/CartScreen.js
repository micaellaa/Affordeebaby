import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import COLORS from "../consts/colors";
import products from "../consts/products";
import Icon from "react-native-vector-icons/MaterialIcons";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const width = Dimensions.get("window").width / 2 - 30;

const CartScreen = ({ navig, route }) => {
  const navigation = useNavigation();
  const cartID = route.params;
  //const [product, setProduct] = useState();
  //const [total, setTotal] = useState(null);

  const [productsID, setProductsID] = useState([]);
  const cartsRef = doc(firestore, "carts", cartID);

  useEffect(() => {
    async function fetchCartData() {
      const docSnap = await getDoc(cartsRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        console.log("try entered");
        const productList = docSnap.get("productsID");
        setProductsID(productList);
      } catch (error) {
        console.log("Error in finding products", error);
      }
    }
    fetchCartData();
  }, []);

  console.log("productsID: ", productsID);

  let productData = [];
  let totalPrice = 0.00;
  //productsID contains list of product ID's inside the cart
  if (productsID) {
    productsID.forEach((productID) => {
      //if (items.includes(product.id)) {
      console.log(productID);
      const product = products.find(
        (element) => element.id == productID.productID.productID
      );
      productData.push(product);
      totalPrice += product.price;
    });
    //setProduct(productData);
    //getTotal(productData);
  }

  console.log(productData);

  const Card = ({ product }) => {
    if (!product) {
      console.log("product is null");
      return null;
    }
    const [name, setName] = useState("");
    //get cart name

    //setName(product.name);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", product)}
      >
        <View style={styles.card}>
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={product.img}
              style={{
                width: 150,
                height: 150,
                flex: 1,
                resizeMode: "contain",
              }}
            />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {product.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              ${product.price}
            </Text>
            <View
              style={{
                height: 25,
                width: 50,
                backgroundColor: COLORS.indigo,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                Edit
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 50,
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", paddingHorizontal: 50 }}
          >
            My
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: COLORS.indigo,
              fontWeight: "bold",
              paddingHorizontal: 50,
            }}
          >
            Carts
          </Text>
        </View>
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
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={productData}
        renderItem={(item) => {
          console.log(item);
          return <Card product={item.item} />;
        }}
      />
      <View>
        <Text style = {{fontWeight: 'bold'}}>
          Total: {totalPrice}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CartContributors", cartID)}
        >
          <Text style={styles.buttonText}>Edit Contributors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
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
  buttonContainer: {
    flex: 1,
    width: "60%",
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

/* fions getData
const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      items.forEach((product) => {
        if (items.includes(product.id)) {
          productData.push(product);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };
  */

/* getDataFromDB
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    //let items = await AsyncStorage.getItem("cartItems");
    //items = JSON.parse(items);

    const [productsID, setProductsID] = useState([]);
    const cartsRef = doc(firestore, "carts", cartID);

    useEffect(() => {
      async function fetchCartData() {
        const docSnap = await getDoc(cartsRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        }
        try {
          console.log("try entered");
          const productList = docSnap.get("productsID");
          setProductsID(productList);
        } catch (error) {
          console.log("Error in finding products", error);
        }
      }
      fetchCartData();
    }, []); */
/* remove item from cart button
    <TouchableOpacity onPress={() => removeItemFromCart(product.id)}>
              <Icon
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLORS.dark,
                  backgroundColor: COLORS.light,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>*/
