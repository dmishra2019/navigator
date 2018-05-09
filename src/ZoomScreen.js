import React from 'react';
import { StyleSheet, Dimensions, Image, Easing } from 'react-native';
import ZoomImage from 'react-native-zoom-image';

export default class ZoomScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `${state.params.title}`,
            headerStyle: {
                backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
        };
    };
    render() {
        const { state } = this.props.navigation;
        return (
            // <Image style={styles.image} source={{ uri: state.params.image }} />
            <ZoomImage
                source={{ uri: state.params.image }}
                imgStyle={styles.image}
                style={styles.image}
                duration={200}
                enableScaling={true}
                easingFunc={Easing.ease}
            />
        )
    }
}
const styles = StyleSheet.create({
    image: {
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').height)
    }
});