import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  //
  // context hooks
  //
  const { tryLocalSignin } = useContext(AuthContext);

  //
  // useEffect hooks
  //
  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
