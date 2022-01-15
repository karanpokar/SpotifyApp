import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {typography} from '../typography';

const renderSongs = ({item}) => (
  <TouchableOpacity style={{height: 100, flexDirection: 'row'}}>
    {/* <Text style={{color: 'red'}}>{item.name}</Text> */}
    <Image
      source={{uri: item.album.images[0].url}}
      style={{height: 100, width: 100, resizeMode: 'contain'}}
    />
    <View style={{justifyContent: 'center', flex: 1, marginHorizontal: 10}}>
      <Text
        numberOfLines={3}
        adjustsFontSizeToFit={true}
        style={{
          color: '#fff',
          marginBottom: 10,
          fontSize: 18,
          fontFamily: typography.Bold,
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          fontFamily: typography.Bold,
          color: '#fff',
          marginBottom: 10,
          fontSize: 14,
        }}>
        {item.artists[0].name}
      </Text>
    </View>
    <TouchableOpacity
      // onPress={() =>
      //   fav.indexOf(item.id) == -1
      //     ? setFav([...fav, item.id])
      //     : setFav([fav.filter(item => item != item.id)])
      // }
      onPress={() => updateFav(item)}>
      <Image
        style={{width: 20, height: 20}}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1000/1000621.png',
        }}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);
