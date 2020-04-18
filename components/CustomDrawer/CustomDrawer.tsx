import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import CustomDrawerItem from './CustomDrawerItem';

export default class CustomDrawer extends React.Component<{ navigation: any, state: any }> {
    private styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#010101',
        },
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#010101',
            width: '100%',
        },
        containerInner: {
            flex: 1,
            backgroundColor: '#1B1B1E',
        },
        containerInnerLogo: {
            flex: 0,
            backgroundColor: '#010101',
        },
        containerInnerLogoImg: {
            width: 240 * 0.666,
            height: 52 * 0.666,
            marginVertical: 10,
        },
        navigationContainer: {
            flex: 1,
        },
        bottomContainer: {
            flex: 0,
        },
        createdBy: {
            color: '#FFF', alignSelf: 'center', alignContent: 'center', paddingVertical: 10,
        },
        divider: {
            alignSelf: 'center',
            backgroundColor: 'rgba(50,50,50,1)',
            width: '70%',
            marginVertical: 20,
        },
    });

    render() {
        const currentRoute = this.props.state.routeNames[this.props.state.index];
        return (
            <SafeAreaView style={this.styles.safeArea} forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={this.styles.container}>
                    <View style={this.styles.containerInner}>
                        <View style={this.styles.containerInnerLogo}>
                            <Image style={this.styles.containerInnerLogoImg} source={require('../../assets/logo.png')}/>
                        </View>

                        <View style={this.styles.navigationContainer}>
                            <DrawerContentScrollView {...this.props}>
                                <CustomDrawerItem label={'Home'} iconName={'cloud'} isActive={currentRoute === 'Home'} iconColor={'#FFF'} onPress={() => {
                                    this.props.navigation.navigate('Main');
                                }}/>
                                <CustomDrawerItem label={'Settings'} iconName={'widget'} isActive={currentRoute === 'Settings'} iconColor={'#FFF'} onPress={() => {
                                    this.props.navigation.navigate('Settings');
                                }}/>
                                <CustomDrawerItem label={'Locations'} iconName={'plus'} isActive={currentRoute === 'Locations'} iconColor={'#FFF'} onPress={() => {
                                    this.props.navigation.navigate('Locations');
                                }}/>
                            </DrawerContentScrollView>
                        </View>

                        <View style={this.styles.bottomContainer}>
                            <Text style={this.styles.createdBy}>www.dilana.in</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
