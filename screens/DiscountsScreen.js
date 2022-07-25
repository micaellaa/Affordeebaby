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
import DiscountsCartsDropdown from "../components/DiscountsCartsDropdown";

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

  const Card = ({ discount }) => {
    return (
      <View>
        <View style={styles.card}>
          <View style={styles.discountContainer}>
            <Image source={discount.img} style={styles.discImage} />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
          >
            <View style={styles.discountDetailsCont}>
              <Text style={styles.discountNameText}>{discount.name}</Text>
              <Text style={styles.discMinSpendText}>
                Minimum Spend: ${discount.minspend}
              </Text>
            </View>
            <DiscountsCartsDropdown />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>DISCOUNTS</Text>
        </View>
      </View>
      <View style={styles.sortContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList />
      <View style={{ alignItems: "center", width: "100%" }}>
        <FlatList
          //columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={1}
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
    flex: 1,
    height: 180,
    backgroundColor: COLORS.lightindigo,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "column",
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
  sortContainer: { marginTop: 30, flexDirection: "row", paddingHorizontal: 50 },

  space1: {
    width: 60,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  discountContainer: {
    height: 100,
    alignItems: "center",
  },
  headerText: { fontSize: 25, fontWeight: "bold", paddingHorizontal: 50 },

  container: {
    flex: 3,
    backgroundColor: COLORS.white,
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
  discountNameText: { fontWeight: "bold", fontSize: 19, marginTop: 5 },
  discountDetailsCont: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  discMinSpendText: { fontSize: 16, fontWeight: "bold" },
  discApplyButton: {
    height: 25,
    width: 50,
    backgroundColor: COLORS.indigo,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  discApplyText: { color: COLORS.white },
  discImage: {
    width: 300,
    height: 100,
    flex: 1,
    resizeMode: "contain",
  },
});
