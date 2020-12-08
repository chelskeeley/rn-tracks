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

  //
  // useEffect hooks
  //
  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();

        if (!granted) {
          throw new Error("Location Permissions not granted.");
        }

        subscirber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000, // once every second, OR
            distanceInterval: 10 // once every ten meters
          },
          locationCallback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrackLocation) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrackLocation, locationCallback]);

  return [err];
};
