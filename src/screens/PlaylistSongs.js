import axios from 'axios';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import RenderPlayList from '../components/RenderPlayList';
import {Colors} from '../theme';
import {typography} from '../typography';

const PlayListSongs = ({route, navigation}) => {
  const [playListData, setPlayListData] = React.useState([]);
  const getPlaylist = async token => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${route.params.id}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setPlayListData(res.data.items);
        console.log(JSON.stringify(res.data.items[0], null, 2));
      });
  };

  React.useEffect(() => {
    getPlaylist(route.params.token);
  }, []);
  console.log(playListData);

  const renderPlaylist = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SongProfile', {data: item})}
      style={styles.container}>
      {/* <Text style={{color: 'red'}}>{item.name}</Text> */}
      <Image
        source={{uri: item.track.album.images[0].url}}
        style={styles.image}
      />
      <View style={{justifyContent: 'center', flex: 1, marginHorizontal: 10}}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          //          adjustsFontSizeToFit={true}
          style={styles.name}>
          {item.track.name}
        </Text>
        <Text style={styles.artistsText}>
          {item.track.artists[0].name}{' '}
          {item.track.artists[1] ? `, ${item.track.artists[1].name}` : ''}
        </Text>
        <Text style={styles.popularity}>
          Popularity: {item.track.popularity}
        </Text>
      </View>
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
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Image
              source={{uri: route.params.image}}
              style={{width: 125, height: 125, borderRadius: 10}}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              //          adjustsFontSizeToFit={true}
              style={{
                fontFamily: typography.Black,
                color: '#fff',
                margin: 10,

                fontSize: 26,
              }}>
              {route.params.name}
            </Text>
          </View>
        }
        scrollEnabled
        data={playListData}
        keyExtractor={item => item.track.id}
        renderItem={renderPlaylist}
      />
    </View>
  );
};

export default PlayListSongs;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  image: {height: 100, width: 100, resizeMode: 'contain'},
  name: {
    fontFamily: typography.Black,
    color: '#fff',
    marginBottom: 10,

    fontSize: 16,
  },
  artistsText: {
    color: '#fff',
    marginBottom: 10,
    fontFamily: typography.Medium,
    fontSize: 14,
  },
  popularity: {
    color: '#fff',
    marginBottom: 10,
    fontFamily: typography.Medium,
    fontSize: 12,
  },
  headerContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
