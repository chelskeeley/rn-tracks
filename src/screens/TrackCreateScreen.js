import "../_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";

const TrackCreateScreen = ({ isFocused }) => {
  //
  // useContext hooks
  //
  const { addLocation } = useContext(LocationContext);

  //
  // custom hooks
  //
  const [err] = useLocation(isFocused, addLocation);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h3>Create a Track</Text>
      <Map />
      {err ? (
        <Text style={styles.error}>Please enable location services.</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red"
  }
});

export default withNavigationFocus(TrackCreateScreen);
