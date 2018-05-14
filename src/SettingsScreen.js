import React from 'react';
import { StyleSheet, Text, View, Alert, Platform, Slider } from 'react-native';
import Constants from './Constants'
import DataController from './db/DataController';

const MARGIN_VERTICAL = 10;
export default class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `Settings`,
            headerStyle: {
                backgroundColor: Constants.COLOR.PINK_DARK,
            },
            headerTintColor: '#fff',
        };
    };
    constructor(props) {
        super(props);
        this.state = { radius: Constants.DEFAULT_SETTINGS.radius, results: Constants.DEFAULT_SETTINGS.results };
    }
    async componentDidMount() {
        let settings = await DataController.getSettings();
        this.setState({ radius: settings.radius, results: settings.results });
    }
    saveSettings() {
        DataController.saveSettings({ radius: this.state.radius, results: this.state.results });
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, padding: 15 }}>
                <Text style={{ marginBottom: 5 }}>Radius: {this.state.radius} Km</Text>
                <Slider
                    step={1}
                    minimumValue={1}
                    maximumValue={20}
                    value={this.state.radius}
                    onValueChange={val => this.setState({ radius: val })}
                    onSlidingComplete={val => this.saveSettings()}
                    minimumTrackTintColor={Constants.COLOR.PINK}
                />
                <Text style={{ marginTop: 5, marginBottom: 5 }}>Search Results: {this.state.results} /Page</Text>
                <Slider
                    step={1}
                    minimumValue={1}
                    maximumValue={30}
                    value={this.state.results}
                    onValueChange={val => this.setState({ results: val })}
                    onSlidingComplete={val => this.saveSettings()}
                    minimumTrackTintColor={Constants.COLOR.PINK}
                />
                <Text style={{ marginTop: 20, color: 'black' }}>About</Text>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: MARGIN_VERTICAL }}>
                    <Text style={{ flex: 1, color: 'black' }}>Version</Text>
                    <Text style={{ flex: 1, color: Constants.COLOR.GRAY, textAlign: 'right' }}>1.0.0</Text>
                </View>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: MARGIN_VERTICAL }}>
                    <Text style={{ flex: 1, color: 'black' }}>Platform</Text>
                    <Text style={{ flex: 1, color: Constants.COLOR.GRAY, textAlign: 'right' }}>{Platform.OS == 'ios' ? 'iPhone' : 'Android'}</Text>
                </View>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: MARGIN_VERTICAL }}>
                    <Text style={{ flex: 1, color: 'black' }}>Technology</Text>
                    <Text style={{ flex: 1, color: Constants.COLOR.GRAY, textAlign: 'right' }}>React-Native</Text>
                </View>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: MARGIN_VERTICAL }}>
                    <Text style={{ color: 'black' }}>Developer</Text>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Constants.COLOR.GRAY, textAlign: 'right' }}>Diwakar Mishra</Text>
                        <Text style={{ color: Constants.COLOR.GRAY, textAlign: 'right' }}>https://github.com/diwakar1988</Text>
                    </View>
                </View>
            </View>
        );
    }
}
