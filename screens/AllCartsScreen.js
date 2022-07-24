import { useNavigation } from "@react-navigation/core";
//import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";
//import { TouchableOpacity } from "react-native";
import { authentication } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Button,
  Modal,
} from "react-native";
//import { TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { TouchableOpacity } from "react-native-gesture-handler"; // took out TextInput
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MenuProvider } from "react-native-popup-menu";
import { createCartDocument } from "../firebase/firebase-config";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import onMultiChange from "../functions/onMultiSelect";
//import AddContributorsDropdown from "../components/AddContributorsDropdown";

const width = Dimensions.get("window").width / 2 - 30;
const height = 2;

const CartPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const stub = [
  { item: "mic", id: 1 },
  { item: "fion", id: 2 },
  { item: "alex", id: 3 },
];

const AllCartsScreen = () => {
  const navigation = useNavigation();

  //get array of cart ids
  const [carts1, setCarts1] = useState("");

  const [CartName, setCartName] = useState("");
  const [usersid, setusersid] = useState([""]);

  const user = authentication.currentUser;
  const userUID = user.uid;
  const usersRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchCarts() {
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        console.log("try entered");
        const carts = docSnap.get("carts");
        console.log("carts: ", carts);
        setCarts1(carts);
      } catch (error) {
        console.log("Error in finding carts", error);
      }
    }
    fetchCarts();
  }, []);

  console.log("carts1: ", carts1);

  const Card = ({ cartID }) => {
    const [name, setName] = useState("");
    console.log("cartID into Card:", cartID);
    //get cart name
    const cartsRef = doc(firestore, "carts", cartID);

    useEffect(() => {
      async function fetchCart() {
        const docSnap = await getDoc(cartsRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        }
        try {
          console.log("try entered");
          const cN = docSnap.get("cartname");
          setName(cN);
        } catch (error) {
          console.log("Error in finding carts", error);
        }
      }
      fetchCart();
    }, []);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Cart", { cartID: cartID, discountID: null })
        }
      >
        <View style={styles.card}>
          <View style={styles.cartBtn}>
            <Image
              style={styles.cartDimensions}
              source={require("../assets/bell-icon2.png")}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const [visible, setVisible] = useState(false);

  const AddContributorsDropdown = () => {
    const [friendsNames, setFriendsNames] = useState([""]);
    const [friendsIDs, setFriendsIDs] = useState([""]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const selectedIDs = [];

    //fetch friends IDs
    useEffect(() => {
      async function fetchFriendsIDs() {
        const docSnap = await getDoc(usersRef);
        try {
          const friendIDTemp = docSnap.get("friendships");
          setFriendsIDs(friendIDTemp);
        } catch (error) {
          console.log("Error in finding friends1", error);
        }
      }
      fetchFriendsIDs();
    }, []);

    const data = [];

    //(async () => {
    for (var i = 0; i < friendsIDs.length; i++) {
      var friendID = friendsIDs[i];
      if (friendsIDs[i]) {
        console.log("*friendIDinArray ", friendID);

        let friend = { id: friendID, item: friendID };

        data.push(friend);
      }
    }

    console.log("data1: ", data);

    console.log("data2: ", data);

    return (
      <View style={{ margin: 30 }}>
        <View style={{ height: 40 }} />
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>
          Add Contributors
        </Text>
        <SelectBox
          label="Select multiple"
          options={data}
          selectedValues={selectedTeams}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
        />

        <Button
          title="Create New Cart"
          color={COLORS.green}
          onPress={() => {
            for (let i = 0; i < selectedTeams.length; i++) {
              console.log("selectedTeams.ids: ", selectedTeams[i].id);
              selectedIDs.push(selectedTeams[i].id);
            }
            console.log("selectedIDs: ", selectedIDs);
            createCartDocument(user, [CartName, selectedIDs]);
          }}
        />
      </View>
    );

    function onMultiChange() {
      console.log("selectedteams: ", selectedTeams);
      return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
    }
  };

  return (
    <View>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 20,
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
        style={{
          marginTop: 30,
          marginBottom: 20,
          flexDirection: "row",
          paddingHorizontal: 50,
        }}
      >
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        <View style={styles.sortBtn}>
          <Icon
            name="add-shopping-cart"
            size={30}
            color={COLORS.white}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={1}
          data={carts1}
          renderItem={({ item }) => {
            return <Card cartID={item} />;
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CartPopUp visible={visible}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <View>
              <Text>X</Text>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Create New Cart</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Cart Name"
              value={CartName}
              onChangeText={(text) => setCartName(text)} //a lambda
              style={styles.input}
            />
          </View>
          <View>
            <AddContributorsDropdown />
          </View>
        </CartPopUp>
      </View>
    </View>
  );
};

export default AllCartsScreen;

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
    flex: 1,
    height: 90,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
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
  cartBtn: {
    height: 40,
    width: 40,
    borderRadius: 40,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  inputContainer: {
    width: "80%",
    paddingHorizontal: 10,
  },

  input: {
    backgroundColor: "white", //grey
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  cartDimensions: {
    width: 40,
    height: 40,
  },
});

/* fions card
const Card = ({ product }) => {
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
              style={{ flex: 1, resizeMode: "contain" }}
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
  */

/*<Button
              title="Add Contributors"
              color={COLORS.indigo}
              onPress={() => 
              {const [selectedTeams, setSelectedTeams] = useState([]);
                const stub = [{item: 'mic', id: 1}, {item: 'fion', id: 2}]
                return (
                <View style={{ margin: 30 }}>
                <View style={{ height: 40 }} />
                <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
                <SelectBox
                label="Select multiple"
                options={stub}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                />*/
