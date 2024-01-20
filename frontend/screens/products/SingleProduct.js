import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Container, HStack, VStack } from 'native-base';
import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import EasyButton from "../../shared/StyledComponents/EasyButton";
import TrafficLight from "../../shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    console.log(props.route.params.item);
    
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("");

    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable");
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock");
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Aavailable");
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 30, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>

                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Aavailability:{availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <Text style={styles.price}>$ {item.price}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <EasyButton
                    primary
                    medium
                    onPress={() => {
                        props.addItemToCart(
                            item),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} added to Cart`,
                                text2: "Go to your cart to complete order"
                            })
                    }}
                >
                    <Text style={{ color: "white" }}>Add</Text>
                </EasyButton>
            </View>
        </View>
    )

}

const mapToDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 10,
        backgroundColor: 'white',
        marginBottom: 10
    },
    price: {
        fontSize: 24,
        margin: 15,
        padding: 0,
        color: 'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 10,
        marginBottom: 10
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: "row",
        marginBottom: 10
    }
})

export default connect(null, mapToDispatchToProps)(SingleProduct);


