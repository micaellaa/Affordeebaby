import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import COLORS from "../consts/colors";
import products from "../consts/products";
import Icon from "react-native-vector-icons/MaterialIcons";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = (cartID) => {
  const navigation = useNavigation();
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

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

  let productData = [];

  //productsID contains list of product ID's inside the cart
  /* if (productsID) {
    productsID.forEach((productID) => {
      //if (items.includes(product.id)) {
      console.log(productID.productID);
      const product = products.find(
        (element) => element.id == productID.productID
      );
      productData.push(product);
      //return;
    });
    setProduct(productData);
    //getTotal(productData);
  } else {
    setProduct(false);
    //getTotal(false);
  }*/

  /*
  //get total price of all items in the cart
  const getTotal = (productData) => {

    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].price;
      total = total + productPrice;
    }

    setTotal(0);
  };

  const checkOut = async () => {
    navigation.navigate("Home");
  };

  const renderProducts = (product) => {
    return (
      <TouchableOpacity
        //key={product.key}
        onPress={() =>
          navigation.navigate("DetailsScreen", { productID: product.id })
        }
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.light,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={product.img}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: COLORS.dark,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {product.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                &#8377;{product.price}
              </Text>
              <Text>
                (~&#8377;
                {product.price + product.price / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLORS.light,
                  opacity: 0.5,
                }}
              >
                <Icon
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLORS.dark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLORS.light,
                  opacity: 0.5,
                }}
              >
                <Icon
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLORS.dark,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
*/
  //final return
  return (
    /*
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        position: "relative",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLORS.dark,
                padding: 12,
                backgroundColor: COLORS.light,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.dark,
              fontWeight: "400",
            }}
          >
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.dark,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          My Cart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
      </ScrollView>
    </View>
  );*/
    <View>
      <Text>Stub</Text>
    </View>
  );
};

export default CartScreen;

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
