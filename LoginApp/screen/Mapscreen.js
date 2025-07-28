import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Alert, ActivityIndicator, Dimensions
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MapScreen() {
  const [coords, setCoords] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reached, setReached] = useState(false);
  const [distanceKm, setDistanceKm] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const decodePolyline = encoded => {
    let points = [], index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0; result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const fetchRoute = async (from, to) => {
    const key = 'YOUR_GOOGLE_MAPS_API_KEY'; // replace with actual key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from.latitude},${from.longitude}&destination=${to.latitude},${to.longitude}&key=${key}`;
    try {
      const res = await fetch(url);
      const { routes } = await res.json();
      if (routes?.length) {
        const points = decodePolyline(routes[0].overview_polyline.points);
        setRouteCoords(points);
      }
    } catch (err) {
      console.warn('Failed to fetch route:', err);
    }
  };

  useEffect(() => {
    let sub;
    const start = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10, timeInterval: 3000 },
        loc => {
          const { latitude, longitude } = loc.coords;
          setCoords({ latitude, longitude });
          setLoading(false);

          if (destination) {
            const dist = getDistance(latitude, longitude, destination.latitude, destination.longitude);
            setDistanceKm((dist / 1000).toFixed(2));

            if (dist < 50 && !reached) {
              Alert.alert('🎉 You have reached your destination!');
              setReached(true);
            }

            fetchRoute({ latitude, longitude }, destination);
          }
        }
      );
    };

    start();
    return () => sub?.remove();
  }, [destination]);

  const onMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDestination({ latitude, longitude });
    setReached(false); // reset if you tap a new destination
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🗺️ Dynamic Destination Tracker</Text>
      {loading || !coords ? (
        <ActivityIndicator size="large" color="#e91e63" />
      ) : (
        <>
          <MapView
            style={styles.map}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            onPress={onMapPress}
          >
            <Marker coordinate={coords} title="You" />
            {destination && <Marker coordinate={destination} title="Destination" pinColor="green" />}
            {routeCoords.length > 0 && (
              <Polyline coordinates={routeCoords} strokeColor="#d81b60" strokeWidth={4} />
            )}
          </MapView>

          <Text style={styles.text}>Lat: {coords.latitude.toFixed(5)}</Text>
          <Text style={styles.text}>Lon: {coords.longitude.toFixed(5)}</Text>
          <Text style={styles.info}>
            {destination
              ? (reached ? '✅ Destination Reached' : `🛣️ ${distanceKm} km remaining`)
              : '👆 Tap on the map to set a destination'}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 30, backgroundColor: '#fff0f5' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#d81b60' },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 350,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: { fontSize: 16, color: '#880e4f' },
  info: { fontSize: 18, color: '#4a148c', fontWeight: 'bold', marginTop: 10 },
});
