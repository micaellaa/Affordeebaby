import { useNavigation } from '@react-navigation/core'
//import { signOut } from 'firebase/auth';
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, FlatList, Dimensions } from 'react-native';
//import { TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
//import { authentication } from "../firebase/firebase-config";
import COLORS from '../consts/colors';
import products from '../consts/products';
/*import { ScrollView } from 'react-native-gesture-handler';*/
import Icon from 'react-native-vector-icons/MaterialIcons';


//const width = Dimensions.get('window').width / 2 - 30; 

const ShoppingScreen = () => {

  const navigation = useNavigation()
    return (
      <View>
        <Text>Shopping screen</Text>
      </View>
    );
  };

  
export default ShoppingScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  

  
})