import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ResultsScreen from './src/ResultsScreen';
import ZoomScreen from './src/ZoomScreen';
import SettingsScreen from './src/SettingsScreen';


const RootStack = StackNavigator(
  {
    Home: {
      screen: ResultsScreen,
    },
    Zoom: {
      screen: ZoomScreen,
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