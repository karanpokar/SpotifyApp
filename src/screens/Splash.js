import axios from 'axios';
import {Buffer} from 'buffer';
import qs from 'qs';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import GetLocation from 'react-native-get-location';
import {CLIENT_ID, CLIENT_SECRET_ID} from '../apiCredentials';
import {Colors} from '../theme';

const Splash = ({navigation}) => {
  // Init Function to fetch Device Location
  const init = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        fetchCountryCode(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        Alert.alert('Error', message);
      });
  };

  //fetchCountryCode to fetch countrycode from current device location
  const fetchCountryCode = async (lat, long) => {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`,
      )
      .then(res => getToken(res.data.address.country_code))
      .catch(e => {
        Alert.alert('Error', e);
      });
  };

  //To fetch bearer token from spotify

  const auth_token = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET_ID}`,
    'utf-8',
  ).toString('base64');
  const data = qs.stringify({grant_type: 'client_credentials'});

  const getToken = async code => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        data,
        {
          headers: {
            Authorization: `Basic ${auth_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      navigation.navigate('Playlist', {
        token: response.data.access_token,
        code: code,
      });
      console.log('response', response.data);
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.primaryContainer}>
      <Image
        source={require('./../images/spotifyLogo.png')}
        style={{
          resizeMode: 'contain',
          width: Dimensions.get('screen').width * 0.8,
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
