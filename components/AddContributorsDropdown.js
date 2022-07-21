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
        console.log("Error in finding friends", error);
      }
    }
    fetchFriendsIDs();
  }, []);

  let data = [""];

  for (var i = 0; i < friendsIDs.length; i++) {
    var friendID = friendsIDs[i];
    if (friendsIDs[i]) {
      console.log("*friendIDinArray ", friendID);

      let friend = { id: friendID };

      const friendRef = doc(firestore, "users", friendID);

      var nameTemp;

      async function fetchFriendsNames() {
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
      fetchFriendsNames();
    }

    console.log("data2", data);
    /*
    const friendRef = doc(firestore, "users", friendsIDs[i]);
    var nameTemp;
    async function fetchFriendsNames() {
      const docSnap = await getDoc(friendRef);
      nameTemp = docSnap.get("firstName");
    }
    fetchFriendsNames();

    const friend = {
      item: nameTemp,
      id: friendsIDs[i],
    };
    data.push(friend);
    */
  }

  //fetch friends names

  return (
    <View style={{ margin: 30 }}>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Add Contributors</Text>
      <SelectBox
        label="Select multiple"
        options={stub}
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
