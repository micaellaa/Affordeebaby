import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import { authentication } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
//import allFriends from "../consts/friends";
//import { findDOMNode } from 'react-dom';

const stub = [
  { item: "mic", id: 1 },
  { item: "fion", id: 2 },
  { item: "alex", id: 3 },
];

const AddContributorsDropdown = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const [friendsNames, setFriendsNames] = useState([""]);
  const [friendsIDs, setFriendsIDs] = useState([""]);

  const user = authentication.currentUser;
  const userUID = user.uid;
  const usersRef = doc(firestore, "users", userUID);

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

  /*
  async () => {
    var data = [];
    for (var i = 0; i < friendsIDs.length; i++) {
      var friendID = friendsIDs[i];
      if (friendsIDs[i]) {
        console.log("*friendIDinArray ", friendID);

        let friend = { id: friendID };

        const friendRef = doc(firestore, "users", friendID);

        var nameTemp;

        const docSnap = await getDoc(friendRef);
        try {
          nameTemp = docSnap.get("firstName");
          console.log("*nameTemp ", nameTemp);

          console.log("**nameTemp ", nameTemp);
          friend.item = nameTemp;
          console.log("friend", friend);

          data.push(friend);

          console.log("data: ", data);
        } catch (error) {
          console.log("Error in finding friends", error);
        }
      }
    }
    return data;
  };*/

  /*
  fetchFriendsNames().then((y) => {
    console.log("y: ", y);
    for (var i = 0; i < y.length; i++) {
      data.push(y[i]);
      console.log("data2", data);
    }
  });

  */

  const data = [];

  //(async () => {
  for (var i = 0; i < friendsIDs.length; i++) {
    var friendID = friendsIDs[i];
    if (friendsIDs[i]) {
      console.log("*friendIDinArray ", friendID);

      let friend = { id: friendID, item: friendID };

      data.push(friend);

      //const friendRef = doc(firestore, "users", friendID);

      //var nameTemp;
      /*const docSnap = await getDoc(friendRef);
        try {
          nameTemp = docSnap.get("firstName");
          console.log("*nameTemp ", nameTemp);

          console.log("**nameTemp ", nameTemp);
          friend.item = nameTemp;
          console.log("friend", friend);

          data.push(friend);

          console.log("data: ", data);
        } catch (error) {
          console.log("Error in finding friends2", error);
        }
        */

      //fetchFriendsNames();
    }
  }
  // })().then((y) => {
  //   data = y;
  // });

  console.log("data1: ", data);

  console.log("data2: ", data);

  return (
    <View style={{ margin: 30 }}>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Add Contributors</Text>
      <SelectBox
        label="Select multiple"
        options={data}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  );

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
  }
};

export default AddContributorsDropdown;
