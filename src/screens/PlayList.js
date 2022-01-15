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
  Alert,
} from 'react-native';
import {Colors} from '../theme';
import {typography} from '../typography';

const PlayList = ({route, navigation}) => {
  const [playListData, setPlayListData] = React.useState([]);

  //fetchplaylist from token and country code

  const getPlaylist = async token => {
    await axios
      .get(
        `https://api.spotify.com/v1/browse/featured-playlists?country=${route.params.code}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        setPlayListData(res.data.playlists.items);
      })
      .catch(e => Alert.alert('Error while fetching playlist'));
  };

  React.useEffect(() => {
    getPlaylist(route.params.token);
  }, []);

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
      style={styles.cardContainer}>
      {/* <Text style={{color: 'red'}}>{item.name}</Text> */}
      <Image source={{uri: item.images[0].url}} style={styles.image} />

      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.cardHeader}>
        {item.name}
      </Text>
      <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.description}>
        {item.description}
      </Text>
      <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.cardFooter}>
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
        ListHeaderComponent={
          <View>
            <Text style={styles.listHeader}>Popular in Your Country</Text>
          </View>
        }
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

const styles = StyleSheet.create({
  cardHeader: {
    margin: 4,
    color: '#fff',
    fontFamily: typography.Bold,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  cardFooter: {
    margin: 4,
    color: '#fff',
    fontFamily: typography.Medium,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  description: {
    margin: 4,
    color: '#fff',
    fontFamily: typography.Medium,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#252525',
    width: Dimensions.get('screen').width * 0.45,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  listHeader: {
    margin: 15,
    color: '#fff',
    fontFamily: typography.Bold,
    fontSize: 25,
    alignSelf: 'flex-start',
  },
});
