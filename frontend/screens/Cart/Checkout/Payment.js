import {
    HStack, Radio, Text, VStack, Heading
} from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Button, TouchableWithoutFeedback } from 'react-native';

var { height, width } = Dimensions.get("window");

import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3 }
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 }
]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();

    const [card, setCard] = useState();

    return (
        <View>
            <Heading style={{
                alignSelf: "center",
                marginLeft: 35
            }}>Choose payment method</Heading>

            <View>
                {methods.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback key={item.name} onPress={() => setSelected(item.value)}>
                            <VStack style={styles.list}>
                                <HStack key={index}>
                                    <View>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View>
                                        {selected == item.value && <Icon name="check" color={"#007aff"} />}
                                    </View>
                                </HStack>
                            </VStack>
                        </TouchableWithoutFeedback>
                    )
                })}
                {selected == 3 ? (
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name={"arrow-down"} />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((item, index) => {
                            return <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.value} />
                        })}
                    </Picker>
                ) : null}


                <View style={{ marginTop: 60, alignSelf: 'center' }}>
                    <Text>Press Confirm and Slide to Confirm</Text>
                    <Button
                        title={"Confirm"}
                        onPress={() => props.navigation.navigate("Confirm", { order })} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 10,
    }
})

export default Payment;
