import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authentication } from "./firebase/firebase-config";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RetailersScreen from "./screens/RetailersScreen";
import ShoppingScreen from "./screens/ShoppingScreen";
import FindFriendsScreen from "./screens/FindFriendsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CartScreen from "./screens/CartScreen";
import OtherUserProfileScreen from "./screens/OtherUserProfileScreen";
import AllCartsScreen from "./screens/AllCartsScreen";
import DiscountsScreen from "./screens/DiscountsScreen";
import NotificationScreen from "./screens/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discounts" component={DiscountsScreen} />
        <Stack.Screen name="Retailers" component={RetailersScreen} />
        <Stack.Screen name="Quickshop" component={ShoppingScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="FindFriends" component={FindFriendsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="OtherUserProfile"
          component={OtherUserProfileScreen}
        />
        <Stack.Screen name="AllCarts" component={AllCartsScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*deleted
<Stack.Screen name="ShoppingCart" component={CartScreen} />*/
