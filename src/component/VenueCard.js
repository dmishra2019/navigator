import React from 'react';
import { Dimensions, Text, View, StyleSheet, Image, Alert, Linking, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call'

const no_contact = 'No Contact';
const fake_url = "http://"
export default class VenueCard extends React.Component {
    constructor(props) {
        super(props)
    }
    getVenueThumbnailURL() {
        if (this.props.venue.photos.count == 0) {
            return fake_url;
        }
        let photo = this.props.venue.photos.groups[0]['items'][0];
        let venueURL = photo.prefix + '100x100' + photo.suffix;
        return venueURL;
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
    openBigImage(venue) {
        if (venue.photos.count == 0) {
            return;
        }
        let dim = Dimensions.get('window')
        let photo = venue.photos.groups[0]['items'][0];
        let url = photo.prefix + Math.round(dim.width) + 'x' + Math.round(dim.height) + photo.suffix;
        this.props.navigation.navigate('Zoom', { title: venue.name, image: url });
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
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.openBigImage(this.props.venue)}>
                        <Image style={styles.image} source={{ uri: this.getVenueThumbnailURL() }}></Image>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: 7, marginRight: 7 }}>
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{(this.props.position + 1) + '. ' + venue.name}</Text>
                        <Text style={styles.contact} ellipsizeMode='tail' numberOfLines={1} onPress={() => this.callNumber(this.getContact())}>{this.getContact()}</Text>
                        <Text style={styles.address} ellipsizeMode='tail' numberOfLines={3}>{this.getFullAddress()}</Text>
                    </View>
                    <Text style={[styles.rating, { backgroundColor: this.getRatingColor() }]} ellipsizeMode='tail' numberOfLines={1}>{!venue.rating ? '0' : venue.rating}</Text>
                </View>
                <Text style={styles.tip} ellipsizeMode='tail' numberOfLines={2}>{(!tip) ? ' ' : 'TIP: ' + tip.text}</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: '#8C8C8C',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8C8C8C'
    },
    title: {
        fontSize: 15, color: '#2196F3', fontWeight: 'bold'
    },
    contact: {
        fontSize: 14, color: '#2196F3', marginTop: 2, marginBottom: 2,
    },
    address: {
        fontSize: 14, color: '#8C8C8C'
    },
    rating: {
        paddingTop: 4, textAlign: 'center', fontSize: 16, color: '#FFFFFF', fontWeight: 'bold', width: 30, height: 30,
    },
    tip: {
        fontSize: 13, color: '#8C8C8C', marginTop: 5, fontStyle: 'italic'
    }
});