import React, { useState } from "react";
import { Text, View } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

const InviteFriendsDropdown = () => {
  const navigation = useNavigation();

  //get array of cart ids
  const [friends1, setFriends1] = useState("");

  const user = authentication.currentUser;
  const userUID = user.uid;
  const userRef = doc(firestore, "users", userUID);

  useEffect(() => {
    async function fetchFriends() {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      try {
        const fq = docSnap.get("friendships");
        setFriends1(fq);
      } catch (error) {
        console.log("Error in finding friends", error);
      }
    }
    fetchFriends();
  }, []);

  console.log("friends1: ", friends1);

  const [selectedTeams, setSelectedTeams] = useState([]);

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
  }

  return (
    <View style={{ margin: 30 }}>
      <SelectBox
        label="Select multiple"
        options={friends1}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    </View>
  );
};

export default InviteFriendsDropdown;
