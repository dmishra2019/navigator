import React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import Constants from './Constants'
import Utils from './util/Utils'
import VenueCard from './component/VenueCard'

const HOST = 'https://api.foursquare.com/';
const API = 'v2/venues/explore';
const DEFAULT_QUERY_MAP = { client_id: 'CM21KZD4QJRUVTSIVPJISFUQSV0FHBKG3TZRLH4M5ZIVSUNX', client_secret: 'AWFDESPDPUG3GXSUOVWTRPRYCNYVXMFBBPHDIODAG5HOYECC', v: '20161018', limit: 20, venuePhotos: 1 };

export default class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, dataSource: [], }
    }
    static navigationOptions = {
        title: 'Near You!',
        headerStyle: {
            backgroundColor: Constants.COLOR.PINK_DARK,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        textAlign: 'center',
        alignSelf: 'center'
    };

    loadVenues(latLngStr, searchStr, radius) {
        const QUERY_MAP = { query: searchStr, ll: latLngStr, radius: radius };
        const URL = HOST + API + '?' + Utils.toQueryString(DEFAULT_QUERY_MAP) + '&' + Utils.toQueryString(QUERY_MAP);
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.response.totalResults > 0) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.response.groups[0].items,
                    }, function () {
                        //callback for setState() because its not executed immediately, called when setState() completed
                    });
                } else {
                    throw new Error("No results, please modify your search.");

                }

            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error,
                }, function () {
                    //callback for setState() because its not executed immediately, called when setState() completed
                });
            });
    }

    componentDidMount() {
        this.loadVenues('26.8467,80.9462', 'coffee', 10000); //radius in meters
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
    renderRow = ({ item }) => {
        return <VenueCard venue={item.venue} tips={item.tips} />
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        return (
            <View style={{
                margin: 10
            }}>
                <FlatList

                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.renderSeparator}

                    renderItem={this.renderRow}

                    keyExtractor={item => item.venue.id}
                />

            </View>
        );
    }
}