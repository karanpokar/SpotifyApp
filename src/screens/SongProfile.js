import React from 'react';
import {View, Text, Image} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {Colors} from '../theme';
import {typography} from '../typography';

const SongProfile = ({route}) => {
  const minutes = Math.floor(
    (route.params.data.track['duration_ms'] / 1000 / 60) << 0,
  );
  const seconds = Math.floor(
    (route.params.data.track['duration_ms'] / 1000) % 60 << 0,
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryBackgroundColor}}>
      <Image
        style={{width: '100%', height: '50%', resizeMode: 'contain'}}
        source={{uri: route.params.data.track.album.images[0].url}}></Image>
      <TextTicker
        duration={8000}
        loop
        repeatSpacer={50}
        marqueeDelay={1000}
        //          adjustsFontSizeToFit={true}
        style={{
          fontFamily: typography.Black,
          color: '#fff',
          margin: 10,
          fontSize: 25,
        }}>
        {route.params.data.track.name}
      </TextTicker>
      <Text
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{
          color: '#fff',

          margin: 10,
          fontFamily: typography.Medium,
          fontSize: 18,
        }}>
        Album: {route.params.data.track.album.name}{' '}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{
          color: '#fff',

          margin: 10,
          fontFamily: typography.Medium,
          fontSize: 16,
        }}>
        {route.params.data.track.artists[0].name}{' '}
        {route.params.data.track.artists[1]
          ? `, ${route.params.data.track.artists[1].name}`
          : ''}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{
          color: '#fff',

          margin: 10,
          fontFamily: typography.Medium,
          fontSize: 16,
        }}>
        Duration: {minutes > 9 ? `${minutes}` : `0${minutes}`} :{' '}
        {seconds > 9 ? `${seconds}` : `0${seconds}`}
      </Text>
    </View>
  );
};

export default SongProfile;
