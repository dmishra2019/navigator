import { Alert, AsyncStorage } from 'react-native';
import Constants from '../Constants';

const DB_NAME = '@dbJunket:';
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
        let value = Constants.DEFAULT_SETTINGS;
        try {
            value = JSON.parse(await AsyncStorage.getItem(KEY_SETTINGS));
        } catch (error) {
            console.error(TAG, error);
        }
        return value;
    }
    static async addFavoriteVenue(venue) {
        let success = true;
        try {
            let arr = await this.getFavoriteVenues();
            if (!arr || arr.length == 0) {
                arr = [];
            }
            arr.push(venue);
            await AsyncStorage.setItem(KEY_FAVORITES, JSON.stringify(arr));
        } catch (error) {
            success = false;
        }
        return success;
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
}
