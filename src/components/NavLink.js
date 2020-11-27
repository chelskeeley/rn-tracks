import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ children, routeName, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
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

export default withNavigation(NavLink);
