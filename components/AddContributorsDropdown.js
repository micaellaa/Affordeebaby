import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
//import allFriends from "../consts/friends";
//import { findDOMNode } from 'react-dom';

const stub = [{item: 'mic', id: 1}, {item: 'fion', id: 2}, {item: 'alex', id: 3}];

const AddContributorsDropdown = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
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
  )

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }
}

export default AddContributorsDropdown;