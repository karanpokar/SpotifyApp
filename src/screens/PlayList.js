import axios from 'axios';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import RenderPlayList from '../components/RenderPlayList';
import {Colors} from '../theme';
import {typography} from '../typography';

const PlayList = ({route, navigation}) => {
  const [playListData, setPlayListData] = React.useState([]);
  const getPlaylist = async token => {
    await axios
      .get('https://api.spotify.com/v1/browse/featured-playlists?country=US', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setPlayListData(res.data.playlists.items);
        console.log(JSON.stringify(res.data.playlists.items[4], null, 2));
      });
  };

  React.useEffect(() => {
    getPlaylist(route.params.token);
  }, []);
  console.log(playListData);

  const renderPlaylist = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlaylistSongs', {
          id: item.id,
          token: route.params.token,
          image: item.images[0].url,
          name: item.name,
        })
      }
      style={{
        flexDirection: 'column',
        backgroundColor: '#252525',
        width: Dimensions.get('screen').width * 0.4,
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        padding: 10,
      }}>
      {/* <Text style={{color: 'red'}}>{item.name}</Text> */}
      <Image
        source={{uri: item.images[0].url}}
        style={{
          height: 100,
          width: 100,
          resizeMode: 'contain',
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={{
          margin: 4,
          color: '#fff',
          fontFamily: typography.Bold,
          fontSize: 14,
          alignSelf: 'flex-start',
        }}>
        {item.name}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{
          margin: 4,
          color: '#fff',
          fontFamily: typography.Medium,
          fontSize: 12,
          alignSelf: 'flex-start',
        }}>
        {item.description}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode={'tail'}
        style={{
          margin: 4,
          color: '#fff',
          fontFamily: typography.Medium,
          fontSize: 12,
          alignSelf: 'flex-start',
        }}>
        Total Tracks: {item.tracks.total}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        backgroundColor: Colors.primaryBackgroundColor,
        flex: 1,
        alignItems: 'center',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={playListData}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderPlaylist}
      />
    </View>
  );
};

export default PlayList;
