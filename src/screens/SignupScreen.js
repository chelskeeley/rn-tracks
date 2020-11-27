import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  //
  // state hooks
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  // context
  //
  const { state, signup } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </Spacer>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button title="Sign Up" onPress={() => signup({ email, password })} />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15
  }
});

export default SignupScreen;
