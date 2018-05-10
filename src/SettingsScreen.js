import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import Constants from './Constants'
import SettingsList from 'react-native-settings-list';

export default class SettingsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            title: `Settings`,
            headerStyle: {
                backgroundColor: Constants.COLOR.PINK_DARK,
            },
            headerTintColor: '#fff',
        };
    };
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = { switchValue: false };
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ flex: 1, margin: 10 }}>
                    <SettingsList borderColor='#CCCCCC'>
                        {/* <SettingsList.Header headerText='First Grouping' headerStyle={{ color: 'white' }} />
                        <SettingsList.Item
                            icon={
                                <View style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}>
                                    <Image style={{ alignSelf: 'center', height: 40, width: 40 }} source={require('../res/img/search.png')} />
                                </View>
                            }
                            itemWidth={50}
                            title='Icon Example'
                            onPress={() => Alert.alert('Icon Example Pressed')}
                        />
                        <SettingsList.Item
                            hasNavArrow={false}
                            switchState={this.state.switchValue}
                            switchOnValueChange={this.onValueChange}
                            hasSwitch={true}
                            title='Switch Example' />
                        <SettingsList.Item
                            title='Different Colors Example'
                            backgroundColor='#D1D1D1'
                            titleStyle={{ color: 'blue' }}
                            arrowStyle={{ tintColor: 'blue' }}
                            onPress={() => Alert.alert('Different Colors Example Pressed')} /> */}
                        <SettingsList.Header headerText='About' headerStyle={{ color: 'black', marginTop: 20, fontSize: 17 }} />
                        <SettingsList.Item titleInfo='1.0.0' hasNavArrow={false} title='Version' />
                        <SettingsList.Item titleInfo={Platform.OS == 'ios' ? 'iPhone' : 'Android'} hasNavArrow={false} title='Platform' />
                        <SettingsList.Item titleInfo='React-Native' hasNavArrow={false} title='Technology' />
                        <SettingsList.Item titleInfo='Diwakar Mishra' hasNavArrow={false} title='Author' />
                        <SettingsList.Item titleInfo='https://github.com/diwakar1988' hasNavArrow={false} title='FollowMe' />
                        {/* <SettingsList.Item title='Settings 1' />
                        <SettingsList.Item title='Settings 2' /> */}
                    </SettingsList>
                </View>
            </View>
        );
    }

    onValueChange(value) {
        this.setState({ switchValue: value });
    }
}

const styles = StyleSheet.create({
    container: {

    }
});