import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import logo from "../assets/Logo.png";

const HeaderBar = () => {

    return (
        <View style={styles.header}>
            <Image
                source={logo}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 20,
        marginBottom:-10
        // backgroundColor: 'green'
    }
})


export default HeaderBar;
