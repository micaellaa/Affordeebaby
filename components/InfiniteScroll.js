import { useNavigation } from "@react-navigation/core";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { firestore } from "../firebase/firebase-config";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import COLORS from "../consts/colors";

// Screen Dimensions
const { height, width } = Dimensions.get("window");

// Screen: Infinite Scroll
class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
    };
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
      // Cloud Firestore: Initial Query
      this.retrieveData();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  // Retrieve Data
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
      });
      console.log("Retrieving Data");
      // Cloud Firestore: Query
      let initialQuery = await firestore
        .collection("users")
        .where("id", "<=", 20)
        .orderBy("id")
        .limit(this.state.limit);
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  */
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
      });
      console.log("Retrieving Data");
      // Cloud Firestore: Query
      const first = query(
        collection(firestore, "users"),
        orderBy("username"),
        limit(25)
      );
      const documentSnapshots = await getDocs(first);

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible);

      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Retrieve More
  retrieveMore = async () => {
    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      console.log("Retrieving additional Data");
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await firestore
        .collection("users")
        .where("id", "<=", 20)
        .orderBy("id")
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit);

      const next = query(
        collection(firestore, "users"),
        orderBy("username"),
        startAfter(lastVisible),
        limit(25)
      );
      // Cloud Firestore: Query Snapshot
      const documentSnapshots = await getDocs(next);

      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) =>
        document.data()
      );

      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      this.setState({
        documentData: [...this.state.documentData, ...documentData],
        lastVisible: lastVisible,
        refreshing: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Render Header
  renderHeader = () => {
    try {
      return <Text style={styles.headerText}>Users</Text>;
    } catch (error) {
      console.log(error);
    }
  };

  // Render Footer
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading) {
        return <ActivityIndicator />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          // Data
          data={this.state.documentData}
          // Render Items
          //onPress={() => navigation.navigate("OtherUserProfile", item.)}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.userButton}
                onPress={() =>
                  this.props.navigation.navigate("OtherUserProfile", item.uid)
                }
              >
                <Text style={styles.firstNameText}>{item.firstName}</Text>
                <Text style={styles.usernameText}>@{item.username}</Text>
              </TouchableOpacity>
            </View>
          )}
          // Item Key
          keyExtractor={(item, index) => String(index)}
          // Header (Title)
          ListHeaderComponent={this.renderHeader}
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached (Takes a function)
          onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0}
          // Refreshing (Set To True When End Reached)
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    );
  }
}

// Wrap and export
export default function RootFunction() {
  const navigation = useNavigation();

  return <InfiniteScroll navigation={navigation} />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  userButton: {
    backgroundColor: COLORS.indigo,
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  headerText: {
    fontFamily: "System",
    fontSize: 36,
    fontWeight: "600",
    color: "#000",
    marginLeft: 12,
    marginBottom: 12,
  },
  itemContainer: {
    height: 80,
    width: width,
    borderWidth: 0.2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },
  firstNameText: {
    fontsize: 20,
    color: "white",
    fontWeight: "bold",
  },
  usernameText: {
    fontsize: 16,
    color: "white",
  },
});
