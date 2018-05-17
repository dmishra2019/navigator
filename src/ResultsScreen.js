import React from 'react';
import { Image, TouchableOpacity, FlatList, View, ActivityIndicator, PermissionsAndroid, Text, Button } from 'react-native';
import Constants from './Constants'
import Utils from './util/Utils'
import VenueCard from './component/VenueCard'
import SearchBox from './component/SearchBox';
import Geolocation from 'react-native-geolocation-service';
import DataController from './db/DataController';

function renderSettings(params) {
    return (<View style={{ flexDirection: 'row' }}>
        <TouchableOpacity activeOpacity={.5} onPress={() => params.handleFavoritesClick()}>
            <Image style={{ width: 25, height: 25, padding: 10, marginTop: 10, marginBottom: 10 }} source={require('../res/img/favorite_white.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.5} onPress={() => params.handleSettingsClick()}>
            <Image style={{ width: 25, height: 25, padding: 10, margin: 10 }} source={require('../res/img/settings.png')} />
        </TouchableOpacity>
    </View>);
}

export default class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            isRefreshing: false,
            offset: 0,
            searchStr: '',
            latlng: '',
            waitingForLocation: true,
            error: null,
            radius: 10,
            results: 10,
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Home',
            headerStyle: {
                backgroundColor: Constants.COLOR.PINK_DARK,
            },
            headerTintColor: '#fff',
            headerRight: renderSettings(params),
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({ handleFavoritesClick: this.onFavoritesClick.bind(this), handleSettingsClick: this.onSettingsClick.bind(this) });
        // const settings = await DataController.getSettings();
        // this.setState({ radius: settings.radius, results: settings.results });
        this.findLocation();
    }
    async findLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Access',
                    'message': 'Navigator needs access to your location in order to provide more relavant results.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => this.onLocationAvailable(position),
                    (error) => (error) => this.onLocationError(error),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                this.setState({
                    isLoading: false,
                    isRefreshing: false,
                    error: new Error('Location permission denied, Navigator needs access to your GPS to provide results.'),
                });

            }
        } catch (err) {
            this.setState({
                isLoading: false,
                isRefreshing: false,
                error: err,
            });
        }

    }
    onLocationAvailable(position) {
        let loc = position.coords.latitude + "," + position.coords.longitude;
        this.setState({ latlng: loc, waitingForLocation: false, error: null }, () => this.loadVenues());
    }
    onLocationError(error) {
        this.setState({ latlng: '', waitingForLocation: true, error: error });
    }

    onFavoritesClick() {
        this.props.navigation.navigate('Favorites');
    }
    onSettingsClick() {
        this.props.navigation.navigate('Settings');
    }
    onSearchClicked(text) {
        if (text == "") {
            return;
        }
        this.setState({ searchStr: text, offset: 0, isRefreshing: true }, () => {
            //called when new state gets saved
            this.findLocation();
        })
    }

    async loadVenues() {
        this.setState({ isLoading: true });
        const settings = await DataController.getSettings();
        let radius = settings.radius * 1000; //convert into meters
        let limit = settings.results;
        let latLngStr = this.state.latlng;
        let searchStr = this.state.searchStr;
        let offset = this.state.offset;

        const QUERY_MAP = { query: searchStr, ll: latLngStr, radius: radius, limit: limit, offset: offset };
        const URL = Constants.HOST + Constants.API_VENUE + '?' + Utils.toQueryString(Constants.DEFAULT_QUERY_MAP) + '&' + Utils.toQueryString(QUERY_MAP);
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.response.totalResults > 0) {
                    let items = this.state.isRefreshing ? responseJson.response.groups[0].items : this.state.dataSource.concat(responseJson.response.groups[0].items);
                    this.setState({
                        isLoading: false,
                        isRefreshing: false,
                        dataSource: items,
                        error: null,
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
                    isRefreshing: false,
                    error: error,
                }, function () {
                    //callback for setState() because its not executed immediately, called when setState() completed
                });
            });
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
        return <VenueCard position={index} venue={item.venue} tips={item.tips} navigation={this.props.navigation} showDelete={false} />
    }
    renderFooter = () => {
        if (!this.state.isLoading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" color={Constants.COLOR.PINK} />
            </View>
        );
    }
    handleLoadMore = () => {
        if (this.state.isRefreshing || this.state.isLoading) {
            return;
        }
        this.setState({ offset: this.state.dataSource.length }, () => {
            this.findLocation();
        })
    }
    handleRefresh = () => {
        this.setState({ offset: 0, isRefreshing: true }, () => {
            this.findLocation();
        })
    }

    render() {
        if (this.state.waitingForLocation) {
            if (this.state.error) {
                msg = this.state.error.message;
                return (
                    <View style={{
                        flex: 1, flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 20
                    }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>{this.state.error.message}</Text>
                        <Button title='Retry' color={Constants.COLOR.PINK_DARK} onPress={() => this.findLocation()} />
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 1, flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator animating size="large" color={Constants.COLOR.PINK} />
                        <Text style={{ fontSize: 16, marginTop: 10 }}>Waiting for location...</Text>
                    </View>
                )
            }
        }
        return (
            <View style={{
                margin: 10
            }}>
                <SearchBox text={this.state.searchStr} onSearchClick={(text) => this.onSearchClicked(text)} />
                <FlatList
                    style={{
                        marginTop: 10
                    }}
                    data={this.state.dataSource}

                    ItemSeparatorComponent={this.renderSeparator}

                    renderItem={this.renderRow}

                    keyExtractor={(item, index) => JSON.stringify(index)}

                    ListFooterComponent={this.renderFooter}

                    onEndReached={this.handleLoadMore.bind(this)}

                    onEndReachedThreshold={5}

                    refreshing={this.state.isRefreshing}

                    onRefresh={this.handleRefresh}
                />
            </View>
        );
    }
}