import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';

const Example = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: "Item 1",
        },
        {
            id: 2,
            name: "Item 2",
        },
        {
            id: 3,
            name: "Item 3",
        },
    ]);

    const deleteItem = (item) => {
        setData(data.filter(d => d.id !== item.id));
    };

    return (
        <SwipeListView
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Text>{item.name}</Text>
                </View>
            )}
            renderHiddenItem={({ item }) => (
                <View style={styles.hiddenItem}>
                    <TouchableOpacity onPress={() => deleteItem(item)}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe={true}

            previewOpenDelay={3000}
            friction={1000}
            tension={40}
        />
    );
};

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "white",
        padding: 20,
    },
    hiddenItem: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 20,
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Example;
