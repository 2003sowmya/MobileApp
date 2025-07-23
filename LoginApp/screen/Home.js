import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [coords, setCoords] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let locationSubscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (location) => {
          const { latitude, longitude } = location.coords;
          setCoords({ latitude, longitude });

          try {
            const placemarks = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (placemarks.length > 0) {
              const place = placemarks[0];
              const name = `${place.name || ''}, ${place.city || place.district || ''}, ${place.region || ''}`;
              setPlaceName(name);
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
            setPlaceName("Unable to determine location name");
          }

          setLoading(false);
        }
      );
    };

    startTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Live Location Tracker</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#e91e63" />
      ) : (
        <>
          <Text style={styles.text}>
            Latitude: {coords?.latitude.toFixed(6)}
          </Text>
          <Text style={styles.text}>
            Longitude: {coords?.longitude.toFixed(6)}
          </Text>
          <Text style={styles.place}>{placeName}</Text>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#d81b60',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#880e4f',
    marginVertical: 5,
  },
  place: {
    fontSize: 20,
    color: '#ad1457',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
