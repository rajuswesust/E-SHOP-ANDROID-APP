import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const Todo = (props) => {

    const { name, price, image, countInStock } = props;

    return (
        <View style={[styles.item, { margin: 8, padding: 8 }]}>
            <Text style={{ alignSelf: 'center', top: 100 }}>{name}</Text>
            {/* <Button
                title={'Delete Item'}
                color={'red'}
                onPress={() => props.delete(props.name)}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: width / 2 - 20,
        height: width / 1.7,
        // alignItems: 'center',
        // borderColor: 'grey',
        // borderWidth: 1,
        // borderRadius: 5,
        // backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    }
})

export default Todo;