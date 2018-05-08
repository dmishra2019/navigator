import React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';

export default class VenueCard extends React.Component {
    constructor(props) {
        super(props)
    }
    getVenueThumbnailURL() {
        if (this.props.venue.photos.count == 0) {
            return null;
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
        if (!venue.contact) {
            return 'N/A';
        }
        return !venue.contact.formattedPhone ? venue.contact.phone : venue.contact.formattedPhone;
    }
    render() {
        let venue = this.props.venue;
        let tip = this.props.tip;

        return (
            <View style={styles.card}>
                <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
                    <Image style={styles.image} source={{ uri: this.getVenueThumbnailURL() }}></Image>
                    <View style={{ flex: 1, marginLeft: 7, marginRight: 7 }}>
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{venue.name}</Text>
                        <Text style={styles.contact} ellipsizeMode='tail' numberOfLines={1}>{this.getContact()}</Text>
                        <Text style={styles.address} ellipsizeMode='tail' numberOfLines={3}>{this.getFullAddress()}</Text>
                    </View>
                    <Text style={[styles.rating, { backgroundColor: venue.ratingColor.startsWith('#') ? venue.ratingColor : '#' + venue.ratingColor }]} ellipsizeMode='tail' numberOfLines={1}>{venue.rating}</Text>
                </View>
                <Text style={styles.tip} ellipsizeMode='tail' numberOfLines={2}>{'TIP: ' + tip.text}</Text>
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