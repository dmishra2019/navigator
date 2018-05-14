import { Alert, AsyncStorage } from 'react-native';
import Constants from '../Constants';
const DB_NAME = '@dbJunket:';
const KEY_SETTINGS = DB_NAME + 'key_settings'

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
}
