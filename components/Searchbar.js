import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import COLORS from "../consts/colors";
//fetchUsers
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { authentication } from "../firebase/firebase-config";
//import FetchUsers from "./FetchUsers";

export default function Searchbar({ value, style }) {
  const [queryInput, setQueryInput] = useState("");

  //fetchUsers
  const [users1, setUsers1] = useState([]);
  //const [usernameInput, setUsernameInput] = useState("");

  /*
  function updateSearch(value) {
    console.log("updateSearch() entered");
    const q = query(
      collection(firestore, "users"),
      where("username", "==", queryInput)
    );

    //useEffect(() => {
    async function fetchUsers() {
      console.log("fetchUsers() entered");
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const users1 = [];
      querySnapshot.forEach((doc) => {
        console.log("data", doc.id, " => ", doc.data());
        const { email, firstName, mobileNum, username } = doc.data();
        users1.push({
          email,
          firstName,
          mobileNum,
          username,
        });
      });
      setUsers1(users1);
    }

    fetchUsers();
    //});
  }
  */

  /*useEffect(() => {
    async function fetchUsers() {
      const docSnap = await getDoc(usersRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        console.log("try entered");
        const fN = docSnap.get("carts");
        setCarts(cartsList);
      } catch (error) {
        console.log("Error in finding carts", error);
      }
    }
    fetchUsers();
  }, [value]);
*/

  const user = authentication.currentUser;
  const userUID = user.uid;

  const handleSearch = async (queryInput) => {
    const usersRef = doc(firestore, "users", userUID);
    const q = query(
      collection(firestore, "users"),
      where("username", "==", queryInput)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const fN = doc.get("firstName");
      const uN = doc.get("username");
      setUsers1([fN, uN]);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          //resizeMode='center'
          style={styles.searchIcon}
          source={require("../assets/blue-search-icon.png")}
          onPress={handleSearch(queryInput)}
        />
        <TextInput
          value={queryInput}
          placeholder="Key in your friend's username"
          style={styles.textInput}
          onChangeText={(text) => {
            /*var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 12)
                            setError("Query too long.")
                        else if (text.match(letters)) {
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else setError("Please only enter alphabets")*/
            setQueryInput(text);
            //updateSearch(text);
          }}
        />
        {queryInput ? (
          <TouchableOpacity
            onPress={() => setQueryInput("")}
            style={styles.vwClear}
          >
            <Image
              style={styles.backspaceIcon}
              source={require("../assets/backspace-icon.png")}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // width: 40,
    // backgroundColor: 'red'
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },
  searchIcon: {
    height: 30,
    width: 30,
    margin: 5,
  },
  backspaceIcon: {
    height: 22,
    width: 22,
    margin: 5,
  },
  searchContainer: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    flexDirection: "row",
  },
  searchbarContainer: {
    height: "30%",
    backgroundColor: "#0782F9",
    borderRadius: 20,
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
  menuContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 30,
    marginBottom: 40,
    justifyContent: "space-between",
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
  innerContainer: {
    alignItem: "center",
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemHeading: {
    fontWeight: 300,
  },
});

/*
flatlist that didn't work

<View style={{ flex: 1, marginTop: 100 }}>
        <FlatList
          style={{ height: "100%" }}
          data={users1}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={StyleSheet.container}>
              <View style={StyleSheet.innerContainer}>
                <Text style={StyleSheet.itemHeading}>{item.firstName}</Text>
                <Text style={StyleSheet.itemText}>{item.username}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>

  */
