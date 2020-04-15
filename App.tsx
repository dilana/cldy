import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import Locations from './components/Locations/Locations';
import Main from './components/Main/Main';
import Settings from './components/Settings/Settings';

export default class App extends React.Component {
    state: { isLoading: boolean } = {isLoading: true};
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFDE4',
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFDE4',
        },
        loadingText: {
            fontSize: 30,
        },
        headerTitle: {
            color: '#FFF',
            fontSize: 20,
            fontFamily: 'Lato-Regular',
        },
        drawer: {
            backgroundColor: 'rgba(26, 26, 29, 1)',
            width: 240,
        },
    });
    private MainStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} options={({route, navigation}) => ({
                    headerLeft: () => <View style={{paddingLeft: 10}}>
                        <Icon name="menu" color={'#FFF'} size={30} onPress={() => navigation.openDrawer()} underlayColor={'transparent'} activeOpacity={0.8}/>
                    </View>,
                    title: 'Weather',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: this.styles.headerTitle,
                })}/>
            </Stack.Navigator>
        );
    };
    private SettingsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={Settings} options={({route, navigation}) => ({
                    headerLeft: () =>
                        <View style={{paddingLeft: 10, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name="chevron-left" type={'material'} color={'#FFF'} size={30} onPress={() => navigation.goBack()} underlayColor={'transparent'} activeOpacity={0.8}/>
                            <Text style={this.styles.headerTitle} onPress={() => navigation.goBack()}>Back</Text>
                        </View>,
                    title: 'Settings',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: this.styles.headerTitle,
                })}/>
            </Stack.Navigator>
        );
    };
    private LocationsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Locations" component={Locations} options={({route, navigation}) => ({
                    headerLeft: () =>
                        <View style={{paddingLeft: 10, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name="chevron-left" type={'material'} color={'#FFF'} size={30} onPress={() => navigation.goBack()} underlayColor={'transparent'} activeOpacity={0.8}/>
                            <Text style={this.styles.headerTitle} onPress={() => navigation.goBack()}>Back</Text>
                        </View>,
                    title: 'Locations',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: this.styles.headerTitle,
                })}/>
            </Stack.Navigator>
        );
    };

    constructor(props) {
        super(props);
        enableScreens();
        SplashScreen.preventAutoHide();

        // AsyncStorage.multiRemove(['@weather', '@locations', '@settings']).then(() => {});
    }

    componentDidMount() {
        Font.loadAsync({
            'Lato-Hairline': require('./assets/fonts/Lato-Hairline.ttf'),
            'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
            'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
        }).then(() => {
            this.setState({isLoading: false});
        });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Home" drawerStyle={this.styles.drawer} drawerContent={props => <CustomDrawer {...props} />} backBehavior='initialRoute' hideStatusBar={false}>
                            <Drawer.Screen name="Home" component={this.MainStack}/>
                            <Drawer.Screen name="Settings" component={this.SettingsStack}/>
                            <Drawer.Screen name="Locations" component={this.LocationsStack}/>
                        </Drawer.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            );
        } else {
            return (
                <View/>
            );
        }
    }
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
