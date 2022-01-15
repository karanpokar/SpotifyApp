import axios from 'axios';
import {Buffer} from 'buffer';
import qs from 'qs';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {CLIENT_ID, CLIENT_SECRET_ID} from '../apiCredentials';
import {Colors} from '../theme';

const Splash = ({navigation}) => {
  const auth_token = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET_ID}`,
    'utf-8',
  ).toString('base64');
  const data = qs.stringify({grant_type: 'client_credentials'});

  const getToken = async () => {
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
      navigation.navigate('Playlist', {token: response.data.access_token});
      console.log('response', response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getToken();
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
