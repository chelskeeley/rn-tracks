import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { navigate } from "../navigationRef";
import Spacer from "./Spacer";

const NavLink = ({ children, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{children}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue"
  }
});

export default NavLink;
