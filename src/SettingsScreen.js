import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Constants from './Constants'


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
    render() {
        const { state } = this.props.navigation;
        return (
            // <Image style={styles.image} source={{ uri: state.params.image }} />
            <Text>Comming soon</Text>
        )
    }
}
const styles = StyleSheet.create({
    container: {

    }
});