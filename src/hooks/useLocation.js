import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";

export default (shouldTrackLocation, locationCallback) => {
  //
  // useState hooks
  //
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        throw new Error("Location Permissions not granted.");
      }

      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000, // once every second, OR
          distanceInterval: 10 // once every ten meters
        },
        locationCallback
      );
      setSubscriber(sub);
    } catch (e) {
      setErr(e);
    }
  };

  //
  // useEffect hooks
  //
  useEffect(() => {
    if (shouldTrackLocation) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrackLocation]);

  return [err];
};
