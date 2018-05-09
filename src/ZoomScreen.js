import React from 'react';
import { Text, Modal } from 'react-native';
import SingleImageZoomViewer from 'react-native-single-image-zoom-viewer'

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
            // <Text>{state.params.image}</Text>
            <SingleImageZoomViewer source={{ uri: state.params.image }} />
        )
    }
}