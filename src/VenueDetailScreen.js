import React from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import Constants from './Constants'
import VenueDetailsCard from './component/VenuDetailsCard'
import TipCard from './component/TipsCard'
import DataController from './db/DataController';
import Utils from './util/Utils'
import renderIf from './renderIf'

const PIC_WIDTH = Dimensions.get('window').width;
const PIC_HEIGHT = 200;
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
        this.state = {
            isLoadingPhotos: false,
            isLoadingTips: false,
            photos: [],
            tips: [],
        }
    }
    componentDidMount() {
        this.loadPhotos();
        this.loadTips();
    }
    async loadPhotos() {
        this.setState({ isLoadingPhotos: true });
        const settings = await DataController.getSettings();
        let limit = settings.results;
        const { state } = this.props.navigation;
        let venue = state.params.venue;
        const QUERY_MAP = { limit: limit };
        const URL = Constants.HOST + 'v2/venues/' + venue.id + '/photos?' + Utils.toQueryString(Constants.DEFAULT_QUERY_MAP) + '&' + Utils.toQueryString(QUERY_MAP);
        fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.response.photos.count > 0) {
                    this.setState({ isLoadingPhotos: false, photos: responseJson.response.photos.items, error: null });
                } else {
                    throw new Error("No results, please modify your search.");
                }

            })
            .catch((error) => {
                this.setState({ isLoadingPhotos: false, photos: [], error: error, });
            });
    }

    async loadTips() {
        this.setState({ isLoadingTips: true });
        const settings = await DataController.getSettings();
        let limit = settings.results;
        const { state } = this.props.navigation;
        let venue = state.params.venue;
        const QUERY_MAP = { limit: limit, sort: 'recent' };
        const URL = Constants.HOST + 'v2/venues/' + venue.id + '/tips?' + Utils.toQueryString(Constants.DEFAULT_QUERY_MAP) + '&' + Utils.toQueryString(QUERY_MAP);
        fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.response.tips.count > 0) {
                    this.setState({ isLoadingTips: false, tips: responseJson.response.tips.items, error: null });
                } else {
                    throw new Error("No results, please modify your search.");
                }

            })
            .catch((error) => {
                this.setState({ isLoadingTips: false, tips: [], error: error, });
            });
    }
    render() {
        const { state } = this.props.navigation;
        return (
            <ScrollView>
                <View>
                    {renderIf(this.state.photos.length > 0)(
                        <FlatList
                            data={this.state.photos}
                            ItemSeparatorComponent={() => this.renderSeprator()}
                            renderItem={({ item, index }) => this.renderPhoto(item, index)}
                            keyExtractor={(item, index) => JSON.stringify(index)}
                            horizontal={true}
                        />
                    )}
                    <VenueDetailsCard venue={state.params.venue} />
                    {renderIf(this.state.tips.length > 0)(
                        <View>
                            <Text style={{ marginLeft: 10, marginBottom: 10, fontWeight: 'bold' }}>Customer Voice</Text>
                            <FlatList
                                data={this.state.tips}
                                renderItem={({ item }) => <TipCard navigation={this.props.navigation} tip={item} />}
                                keyExtractor={(item, index) => JSON.stringify(index)}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

        )
    }
    openBigImage(item) {
        let dim = Dimensions.get('window');
        let url = item.prefix + Math.round(dim.width) + 'x' + Math.round(dim.height) + item.suffix
        // const { state } = this.props.navigation;
        this.props.navigation.navigate('Zoom', { title: item.source.name, image: url });
    }
    renderPhoto(item, index) {
        return (
            <TouchableOpacity activeOpacity={.5} onPress={() => this.openBigImage(item)}>
                <Image source={{ uri: item.prefix + PIC_WIDTH + 'x' + PIC_HEIGHT + item.suffix }} style={styles.picsPager} />
            </TouchableOpacity>
        );
    }
    renderSeprator() {
        return (<View style={{ width: 5 }} />);
    }
}
const styles = StyleSheet.create({
    picsPager: {
        width: PIC_WIDTH, height: PIC_HEIGHT
    },

});