import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import CustomDrawerItem from './CustomDrawerItem';

export default class CustomDrawer extends React.Component<{ navigation: any, state: any }> {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: 'rgba(26, 26, 29, 1)',
            width: '100%',
            paddingTop: '10%',
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
            <View style={this.styles.container}>
                <ScrollView>
                    <SafeAreaView style={{}} forceInset={{top: 'always', horizontal: 'never'}}>
                        <View style={[{}]}>

                        </View>

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
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}
