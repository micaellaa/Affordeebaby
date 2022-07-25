import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/LoginScreen";
import RetailersScreen from "../screens/RetailersScreen";

jest.mock("assets/logogradientstroke.png");

test("LoginScreen renders correctly", () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("HomeScreen renders correctly", () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
