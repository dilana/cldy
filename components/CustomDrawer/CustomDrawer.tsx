import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import CustomDrawerItem from './CustomDrawerItem';

export default class CustomDrawer extends React.Component<{ navigation: any, state: any }> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#010101',
            width: '100%',
            // paddingTop: '10%',
        },
        navigationContainer: {
            marginBottom: 30,
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
            <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: '#010101'}} forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={this.styles.container}>
                    {/*<ScrollView style={{flex: 1, backgroundColor: ''}}>*/}
                        <View style={{flex: 1, backgroundColor: '#1B1B1E'}}>
                            <View style={{flex: 0, backgroundColor: '#010101'}}>
                                <Text style={{color: '#FFF'}}>LOGOTO tuka</Text>
                                <Text style={{color: '#FFF'}}>LOGOTO tuka</Text>
                                <Text style={{color: '#FFF'}}>LOGOTO tuka</Text>
                                <Text style={{color: '#FFF'}}>LOGOTO tuka</Text>
                            </View>

                            <View style={{flex: 1}}>
                                <DrawerContentScrollView {...this.props}>
                                    <CustomDrawerItem label={'Home'} iconName={'cloud'} isActive={currentRoute === 'Home'} iconColor={'#FFF'} onPress={() => {
                                        this.props.navigation.navigate('Main');
                                    }}/>
                                    <CustomDrawerItem label={'Settings'} iconName={'widget'} isActive={currentRoute === 'Settings'} iconColor={'#FFF'} onPress={() => {
                                        this.props.navigation.navigate('Settings');
                                    }}/>
                                    <CustomDrawerItem label={'Add'} iconName={'plus'} isActive={currentRoute === 'Add'} iconColor={'#FFF'} onPress={() => {
                                        this.props.navigation.navigate('Add');
                                    }}/>
                                </DrawerContentScrollView>
                            </View>

                            <View style={{flex: 0,}}>
                                <Text style={{color: '#FFF', alignSelf:'center', alignContent: 'center', paddingVertical: 10}}>dilana.in</Text>
                            </View>
                        </View>
                    {/*</ScrollView>*/}
                </View>
            </SafeAreaView>
        );
    }
}
