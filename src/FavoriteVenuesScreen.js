import React from 'react';
import { FlatList, View, Text } from 'react-native';
import Constants from './Constants'
import VenueCard from './component/VenueCard'
import DataController from './db/DataController';


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
        return <VenueCard position={index} venue={item.venue} tips={tips} navigation={this.props.navigation} />
    }
    render() {
        if (!this.state.dataSource) {
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