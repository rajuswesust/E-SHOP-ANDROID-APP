import React from "react";



import { Text } from "native-base";
import { StyleSheet, View } from "react-native";


import { connect } from "react-redux";

const CartIcon = (props) => {
    return (
        <>
            {props.cartItems.length ? (
                // <Badge style={StyleSheet.badge}>
                //     <Text style={styles.text}>{props.cartItems.length}</Text>
                // </Badge>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{props.cartItems.length}</Text>
                </View>
            ) : null}
        </>
    )
};

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: -4,
        right: -15
    },
    text: {
        fontSize: 12,
        width: 100,
        fontWeight: 'bold'
    },
    badgeContainer: {
        width: 25,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: -5,
        right: -15,

        backgroundColor: '#e8485d',
        paddingHorizontal: 1,
        paddingVertical: 1.5,
        borderRadius: 15,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
})

export default connect(mapStateToProps)(CartIcon);