import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Switch } from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-navigation';
import Add from './components/Add/Add';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import Main from './components/Main/Main';
import Settings from './components/Settings/Settings';

export default class App extends React.Component {
    state: { isLoading: boolean } = {isLoading: true};

    private MainStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} options={({route, navigation}) => ({
                    headerLeft: () => <View style={{paddingLeft: 10}}><Icon name="menu" color={'#FFF'} size={30} onPress={() => navigation.openDrawer()}/></View>,
                    title: 'Weather',
                    headerTransparent: true,
                    headerTitleStyle: this.styles.headerTitle,
                })}/>
                <Stack.Screen name="Settings" component={Settings} options={{headerTransparent: true, headerTitleStyle: this.styles.headerTitle}}/>
                <Stack.Screen name="Add" component={Add} options={{headerTransparent: true, headerTitleStyle: this.styles.headerTitle}}/>
            </Stack.Navigator>
        );
    };

    private SettingsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={Settings} options={{headerTransparent: true, headerTitleStyle: this.styles.headerTitle}}/>
            </Stack.Navigator>
        );
    };
    private AddStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Add" component={Add} options={{headerTransparent: true, headerTitleStyle: this.styles.headerTitle}}/>
            </Stack.Navigator>
        );
    };

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
            backgroundColor: '#c6cbef',
            width: 240,
        },
    });

    constructor(props) {
        super(props);
        SplashScreen.preventAutoHide();
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
                        <Drawer.Navigator initialRouteName="Home" drawerStyle={this.styles.drawer} drawerContent={props => <CustomDrawer {...props} />}>
                            <Drawer.Screen name="Home" component={this.MainStack}/>
                            <Drawer.Screen name="Settings" component={this.SettingsStack}/>
                            <Drawer.Screen name="Add" component={this.AddStack}/>
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
