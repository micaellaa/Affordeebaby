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
//import { authentication } from "../firebase/firebase-config";
import COLORS from "../consts/colors";
import discounts from "../consts/discounts";
/*import { ScrollView } from 'react-native-gesture-handler';*/
import Icon from "react-native-vector-icons/MaterialIcons";

const width = Dimensions.get("window").width / 2 - 30;

const DiscountsScreen = () => {
  const navigation = useNavigation();
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const categories = ["ALL", "ZARA", "ASOS", "SHEIN"];
  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => 
                setCategoryIndex(index)
            }
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

  const Card = ({ discount }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Quickshop")}
      >
        <View style={styles.card}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 60,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            </View>
          </View>

          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={discount.img}
              style={{ width: 300, height: 100, flex: 1, resizeMode: "contain" }}
            />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {discount.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              Minimum Spend: ${discount.minspend}
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
                <Text style = {{color: COLORS.white, fontWeight: "bold"}}> APPLY </Text>
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
            DISCOUNTS
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
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={discounts}
        renderItem={({ item }) => {
            if (item.brand == catergoryIndex || catergoryIndex == 0) {
                return <Card discount={item} />;
            } else {
                return null;
            }
        }}
      />
    </View>
  );
};

export default DiscountsScreen;

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
});
