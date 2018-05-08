import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ResultsScreen from './src/ResultsScreen';


const RootStack = StackNavigator(
  {
    Home: {
      screen: ResultsScreen,
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