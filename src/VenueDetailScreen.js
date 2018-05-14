import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Constants from './Constants'

export default class VenueDetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `${state.params.venue.name}`,
            headerStyle: {
                backgroundColor: Constants.COLOR.PINK_DARK,
            },
            headerTintColor: '#fff',
        };
    };
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    render() {
        const { state } = this.props.navigation;
        return (
            <View>
                <Text>{JSON.stringify(state.params.venue)}</Text>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    picsPager: {

    },
    detailsCard: {

    },
    tipsPager: {

    }
});