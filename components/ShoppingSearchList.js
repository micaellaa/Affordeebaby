// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import products from "../consts/products";
import { useNavigation } from "@react-navigation/core";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, about, img }) => (
        <View style={styles.item}>
            <Image style = {{height: 30, width: 30}} source = {img} />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.about}>{about}</Text>
            </View>
            
);

// the filter
const ShoppingSearchList = ({ searchPhrase, setClicked, data }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <TouchableOpacity onPress = {() => navigation.navigate('Details', item)}>
        <Item name={item.name} about={item.about} img = {item.img} id = {item.id} />
      </TouchableOpacity>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <TouchableOpacity onPress = {() => navigation.navigate('Details', item)}>
        <Item name={item.name} about={item.about} img = {item.img} id = {item.id} />
      </TouchableOpacity>;
    }
    // filter of the description
    if (item.about.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <TouchableOpacity onPress = {() => navigation.navigate('Details', item)}>
        <Item name={item.name} about={item.about} img = {item.img} id = {item.id} />
      </TouchableOpacity>;
    } 
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

      </View>
    </SafeAreaView>
  );
};

export default ShoppingSearchList;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "80%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});