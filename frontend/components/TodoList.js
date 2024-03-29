import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Todo from "./Todo";

const TodoList = () => {

    const [title, setTitle] = useState('product list');

    const [text, setText] = useState('');
    const [list, setList] = useState(['product 1']);

    const addItem = () => {
        const updatedList = list
        updatedList.push(text)
        setList(updatedList)
        setText('')
    }

    const deleteItem = (index) => {
        const updatedList = list.filter((todo) => todo !== index);
        setList(updatedList);
    }

    return (
        <View style={{ width: '80%', marginBottom: 60 }}>
            <Text style={[styles.align, styles.font]}>{title}</Text>

            <ScrollView >
                {list.map((x, index) => {
                    return <Todo key={index} name={x} index={index} delete={deleteItem} />
                }
                )}
            </ScrollView>

            <View>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={(text) => setText(text)}
                />

                <Button title="Add Item" onPress={addItem} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    align: {
        alignSelf: 'center',
    },
    font: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 8,
        padding: 8
    }
})

export default TodoList;