import PropTypes, { ReactNodeLike, Requireable } from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import 'react-native-gesture-handler';

export default class CustomDrawerItem extends React.Component<{ children: Requireable<ReactNodeLike>, label: string, onPress: (...args: any[]) => any, iconName: string, isActive: boolean, iconColor: string }> {
    static propTypes = {
        children: PropTypes.node,
        label: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        iconName: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        iconColor: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        onPress: () => {
        },
    };

    private styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 0,
            width: '100%',
            overflow: 'hidden'
        },
        containerActive: {
            // backgroundColor: 'rgba(203,37,70,0.2)',
        },
        label: {
            fontFamily: 'Lato-Regular',
            fontSize: 20,
            color: '#FAFAFC',
            margin: 0,
        },
        icon: {
            width: 18,
            height: 18,
            marginHorizontal: 0,
            marginRight: 10,
        },
        leftBar: {
            position: 'absolute',
            left: 0,
            top: 7,
            bottom: 7,
            width: 4,
            height: 31,
            backgroundColor: '#FFFFFF',
        },
        divider: {
            backgroundColor: '#232125',
        },
    });

    render() {
        const {label, iconName, iconColor, isActive, onPress} = this.props;
        const containerStyles = isActive ? [this.styles.container, this.styles.containerActive] : [this.styles.container];
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={containerStyles}>
                    {isActive && <View style={this.styles.leftBar}/>}
                    <Icon name={iconName} color={iconColor || '#FFF'} type={'foundation'} size={18} containerStyle={this.styles.icon}/>
                    <Text style={this.styles.label}>{label}</Text>
                </View>
                <Divider style={this.styles.divider}/>
            </TouchableOpacity>
        );
    }
}
