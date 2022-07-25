import React from "react";
import renderer from "react-test-renderer";

import RetailersScreen from "../screens/RetailersScreen";
import CartContributorsScreen from "../screens/CartContributorsScreen";

test("RetailersScreen renders correctly", () => {
  const tree = renderer.create(<RetailersScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("CartContributorsScreen renders correctly", () => {
  const tree = renderer.create(<CartContributorsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
