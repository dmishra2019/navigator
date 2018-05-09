import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ResultsScreen from './src/ResultsScreen';
import ZoomScreen from './src/ZoomScreen';


const RootStack = StackNavigator(
  {
    Home: {
      screen: ResultsScreen,
    },
    Zoom: {
      screen: ZoomScreen,
    }
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