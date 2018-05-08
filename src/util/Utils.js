export default class Utils {
    static toQueryString(queryMap) {
        let query = '';
        for (let key in queryMap) {
            query += key + '=' + encodeURIComponent(queryMap[key]) + '&';
        }
        return query;
    }

}