import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ResultsScreen from './src/ResultsScreen';
import ZoomScreen from './src/ZoomScreen';
import SettingsScreen from './src/SettingsScreen';
import VenueDetailScreen from './src/VenueDetailScreen';


const RootStack = StackNavigator(
  {
    Home: {
      screen: ResultsScreen,
    },
    Zoom: {
      screen: ZoomScreen,
    },
    VenueDetail: {
      screen: VenueDetailScreen,
    },
    Settings: {
      screen: SettingsScreen
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}