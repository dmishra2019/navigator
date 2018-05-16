import React from 'react';
import { FlatList, View, Text } from 'react-native';
import Constants from './Constants'
import VenueCard from './component/VenueCard'
import DataController from './db/DataController';
import Utils from './util/Utils'

export default class FavoriteVenuesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [] };
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Favorites',
            headerStyle: {
                backgroundColor: Constants.COLOR.PINK_DARK,
            },
            headerTintColor: '#fff'
        }
    };

    async componentDidMount() {
        let arrVenueTipWrapper = await DataController.getFavoriteVenues();
        this.setState({ dataSource: arrVenueTipWrapper });
    }
    async deleteVenue(venueId, index) {
        let deleted = await DataController.removeFavoriteVenue(index);
        let arrVenueTipWrapper = await DataController.getFavoriteVenues();
        if (deleted) {
            this.setState({ dataSource: arrVenueTipWrapper });
        }
        Utils.showMessage('Removed from favorites.');
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 10
                }}
            />
        );
    };
    renderRow = ({ item, index }) => {
        let tips = item.tip ? [item.tip] : [];
        return <VenueCard position={index} venue={item.venue} tips={tips} navigation={this.props.navigation} showDelete={true} onDeleteClick={() => this.deleteVenue(item.venue.id, index)} />
    }
    render() {
        if (!this.state.dataSource || this.state.dataSource.length == 0) {
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontSize: 17 }}>There are no favorites</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 5 }}>You can add favorites by short-listing them.</Text>
                </View>
            );
        }
        return (
            <View style={{
                margin: 10
            }}>
                <FlatList
                    style={{
                        marginTop: 10
                    }}
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => JSON.stringify(index)}
                />
            </View>
        );
    }
}