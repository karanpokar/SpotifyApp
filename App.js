import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import PlaylistSongs from './src/screens/PlaylistSongs';
import PlayList from './src/screens/PlayList';
import SongProfile from './src/screens/SongProfile';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Playlist" component={PlayList} />
        <Stack.Screen name="PlaylistSongs" component={PlaylistSongs} />
        <Stack.Screen name="SongProfile" component={SongProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
