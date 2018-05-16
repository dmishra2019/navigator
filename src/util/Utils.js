import { Alert, ToastAndroid, Platform } from 'react-native';

export default class Utils {
    static toQueryString(queryMap) {
        let query = '';
        for (let key in queryMap) {
            query += key + '=' + encodeURIComponent(queryMap[key]) + '&';
        }
        return query;
    }
    static showMessage(msg) {
        if (Platform.OS === 'ios') {
            Alert.alert(msg);
        } else {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    }

}