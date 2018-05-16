import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import renderIf from '../renderIf'
const BG_COLOR_BOX = '#D3D3D3';
export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: props.text || '', showDelete: false };
    }
    handleTextChange(changedText) {
        let showDeleteIcon = this.state.showDelete;
        if (changedText.length == 0) {
            showDeleteIcon = false;
        } else {
            showDeleteIcon = true;
        }
        this.setState({ text: changedText, showDelete: showDeleteIcon });
    }
    render() {
        return (
            <View style={styles.container}>
                {renderIf(this.state.showDelete)(
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.setState({ text: '', showDelete: false })}>
                        <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('../../res/img/cancel.png')} />
                    </TouchableOpacity>
                )}
                <TextInput
                    style={{ height: 40, flex: 1 }}
                    onChangeText={(text) => this.handleTextChange(text)}
                    value={this.state.text}
                    placeholder='Type and tap search...'
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.onSearchClick(this.state.text)}>
                    <Image style={{ width: 20, height: 20, marginLeft: 5 }} source={require('../../res/img/search.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: BG_COLOR_BOX,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BG_COLOR_BOX,
        alignItems: 'center'
    }
});