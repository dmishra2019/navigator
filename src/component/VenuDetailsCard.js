import React from 'react';
import { Dimensions, Text, View, StyleSheet, Image, Alert, Linking, Share, TouchableOpacity, Platform } from 'react-native';
import call from 'react-native-phone-call'
import Constants from '../Constants';
import TextIcon from './TextIcon'
import DataController from '../db/DataController'
import Utils from '../util/Utils'

const no_contact = 'No Contact';

export default class VenueDetailsCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getFullAddress() {
        let venue = this.props.venue;
        if (venue.location.formattedAddress == null || venue.location.formattedAddress.length == 0) {
            return venue.location.address;
        }
        let address = '';
        for (let i = 0; i < venue.location.formattedAddress.length; i++) {
            address += venue.location.formattedAddress[i] + ', ';
        }
        return address;
    }
    getContact() {
        let venue = this.props.venue;
        let contact = !venue.contact.formattedPhone ? venue.contact.phone : venue.contact.formattedPhone;
        return !contact ? no_contact : contact;
    }
    getRatingColor() {
        let venue = this.props.venue;
        if (!venue.ratingColor) {
            return 'red';
        }
        return venue.ratingColor.startsWith('#') ? venue.ratingColor : '#' + venue.ratingColor;
    }
    callNumber = (number) => {
        if (number === no_contact) {
            return;
        }
        const args = {
            number: number,
            prompt: true // Determines if the user should be prompt prior to the call 
        }

        call(args).catch(err => Alert.alert('An error occurred', 'Calling service unavailable.'))
    }

    getDistance() {
        let distance = this.props.venue.location.distance;
        if (distance < 1000) {
            return distance + ' Meters away';
        }
        return ((distance / 1000).toFixed(2)) + ' Kms away';
    }
    openDirections() {
        let loc = this.props.venue.location;
        let scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=:';
        let latLng = loc.lat + ',' + loc.lng;
        let label = this.props.venue.name;
        let url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`;
        Linking.openURL(url);
    }
    async markFavorite() {
        let success = await DataController.addFavoriteVenue({ venue: this.props.venue, tip: this.props.tip });
        let msg = success ? '"' + this.props.venue.name + '" marked as favorite!' : 'Error while adding favorite. Please try again.';
        Utils.showMessage(msg);
    }
    share() {
        Share.share({
            message: 'Hey checkout this place!',
            title: this.props.venue.name,
            url: this.props.venue.canonicalUrl,
        }, {
                dialogTitle: 'Share Via',
                tintColor: Constants.COLOR.PINK,
            })
            .then(this._showResult)
            .catch(err => console.log(err))
        let url = this.props.venue.canonicalUrl;
    }
    render() {
        let venue = this.props.venue;
        const mockTip = {
            text: 'Junket: There are no reviews for this place.'
        }
        let tip = this.props.tips && this.props.tips.length > 0 ? this.props.tips[0] : mockTip;

        return (
            <View style={styles.card}>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 7 }}>
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={2}>{venue.name}</Text>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.callNumber(this.getContact())}>
                            <Text style={styles.contact} ellipsizeMode='tail' numberOfLines={1}>{this.getContact()}</Text>
                        </TouchableOpacity>
                        <Text style={styles.address} ellipsizeMode='tail' numberOfLines={3}>{this.getFullAddress()}</Text>
                    </View>
                    <Text style={[styles.rating, { backgroundColor: this.getRatingColor() }]} ellipsizeMode='tail' numberOfLines={1}>{!venue.rating ? '0' : venue.rating}</Text>
                </View>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ flex: 1, textAlign: 'left', fontSize: 14, color: '#8C8C8C' }} >{this.getDistance()}</Text>
                    <Text style={{ flex: 1, textAlign: 'right', fontSize: 14, color: this.props.venue.hours.isOpen ? Constants.COLOR.GREEN : Constants.COLOR.RED }}>{this.props.venue.hours.isOpen ? 'OPEN' : 'CLOSED'}</Text>
                </View>

                <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                    <TextIcon iconSource={require('../../res/img/directions.png')} text='Directions' onClick={() => this.openDirections()} />
                    <TextIcon iconSource={require('../../res/img/favorite.png')} text='Shortlist' onClick={() => this.markFavorite()} />
                    <TextIcon iconSource={require('../../res/img/share.png')} text='Share' onClick={() => this.share()} />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    title: {
        fontSize: 15, color: '#2196F3', fontWeight: 'bold'
    },
    contact: {
        fontSize: 14, color: '#2196F3', marginTop: 4, marginBottom: 3,
    },
    address: {
        fontSize: 14, color: '#8C8C8C'
    },
    rating: {
        paddingTop: 4, textAlign: 'center', fontSize: 16, color: '#FFFFFF', fontWeight: 'bold', width: 30, height: 30,
    },

});