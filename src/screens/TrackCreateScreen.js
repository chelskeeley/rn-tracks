import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";

const TrackCreateScreen = ({ isFocused }) => {
  //
  // useContext hooks
  //
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);

  //
  // useCallback hooks
  //

  /**
   * What is this solving?
   * in useLocation hook, if we pass the locationCallback into the dep array of
   * useEffect, then we call useEffect (and therefore startWatching ->
   * requestPermissionsAsync()) every time TrackCreateScreen re-renders,
   * because technically the locationCallback is a new function in memory wiht
   * every re-render
   *
   * HOWEVER, by using the useCallback to create the locationCallback, it will only
   * re-build (ie. create a new function in memory) the locationCallback when something in the dep array of useCallback()
   * has changed
   */
  const locationCallback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  //
  // custom hooks
  //
  const [err] = useLocation(isFocused || recording, locationCallback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h3>Create a Track</Text>
      <Map />
      {err ? (
        <Text style={styles.error}>Please enable location services.</Text>
      ) : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => {
  return {
    title: "Add Track",
    tabBarIcon: <FontAwesome name="plus" size={20} />
  };
};

const styles = StyleSheet.create({
  error: {
    color: "red"
  }
});

export default withNavigationFocus(TrackCreateScreen);
