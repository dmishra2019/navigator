import { Alert, AsyncStorage } from 'react-native';
import Constants from '../Constants';

const DB_NAME = '@dbNavigator:';
const KEY_SETTINGS = DB_NAME + 'key_settings'
const KEY_FAVORITES = DB_NAME + 'key_favorites'
const TAG = 'DataController'

export default class DataController {
    static async saveSettings(settings) {
        try {
            await AsyncStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
        } catch (error) {
            console.error(TAG, error);
        }
    }
    static async getSettings() {
        let value = '';
        try {
            let str = await AsyncStorage.getItem(KEY_SETTINGS);
            value = JSON.parse(str);
            if (!velue) {
                value = Constants.DEFAULT_SETTINGS;
            }
        } catch (error) {
            value = Constants.DEFAULT_SETTINGS;
            // console.error(TAG, error);
        }
        return value;
    }
    static async addFavoriteVenue(venueTipWrapper) {
        let success = true;
        try {
            let arr = await this.getFavoriteVenues();
            if (!arr || arr.length == 0) {
                arr = [];
            }
            if (!await this.inFavorites(venueTipWrapper.venue.id)) {
                arr.push(venueTipWrapper);
                await AsyncStorage.setItem(KEY_FAVORITES, JSON.stringify(arr));
            }
        } catch (error) {
            success = false;
        }
        return success;
    }
    static async inFavorites(venueId) {
        let arr = await this.getFavoriteVenues();
        if (!arr || arr.length == 0) {
            return false;
        }
        for (let wrapper of arr) {
            if (wrapper.venue.id === venueId) {
                return true;
            }
        }
        return false;
    }
    static async getFavoriteVenues() {
        let arr = [];
        try {
            arr = JSON.parse(await AsyncStorage.getItem(KEY_FAVORITES));
        } catch (error) {
            console.error(TAG, error);
        }
        return arr;
    }
    static async removeFavoriteVenue(index) {
        let success = true;
        let arr = await this.getFavoriteVenues();
        arr.splice(index, 1);
        try {
            await AsyncStorage.setItem(KEY_FAVORITES, JSON.stringify(arr));
        } catch (error) {
            success = false;
        }
        return success;
    }
}
