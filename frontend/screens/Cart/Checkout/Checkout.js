import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../shared/Form/FormContainer';
import Input from '../../../shared/Form/Input';

import { connect } from 'react-redux';

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)

        // if(context.stateUser.isAuthenticated) {
        //     setUser(context.stateUser.user.sub)
        // } else {
        //     props.navigation.navigate("Cart");
        //     Toast.show({
        //         topOffset: 60,
        //         type: "error",
        //         text1: "Please Login to Checkout",
        //         text2: ""
        //     });
        // }

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        console.log("orders", orderItems)
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            //status: "3",
            //user,
            zip,
        }

        props.navigation.navigate("Payment", { order: order })

    }

    return (

        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <View style={styles.icon}>
                    {country === '' && <Text style={{ color: 'gray' }}>
                        Select your country <Icon name="arrow-down" color={"#007aff"} /></Text>}
                </View>
                <View style={styles.countryDropdown} picker>

                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{ width: 200 }}
                        selectedValue={country}
                        placeholder="Select your country"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((item, index) => {
                            return <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.name}
                            />
                        })}
                    </Picker>
                </View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Text>Press Payment and Slide to Payment</Text>
                    <Button title="Payment" onPress={() => checkOut()} />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>


    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const styles = StyleSheet.create({
    countryDropdown: {
        // width: "100%",
        flexDirection: 'row',
    },
    icon: {
        // alignItems: 'center',
        // marginTop: 20
    }
})

export default connect(mapStateToProps)(Checkout)
