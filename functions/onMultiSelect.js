import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
//import allFriends from "../consts/friends";
//import { findDOMNode } from 'react-dom';

function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
}

export default onMultiChange;