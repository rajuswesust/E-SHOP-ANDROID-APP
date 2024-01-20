import React from 'react';
import {
    Button, Dimensions,
    Image, StyleSheet, Text, View
} from 'react-native';
import Toast from 'react-native-toast-message';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import { connect, Connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
// import { Toast } from 'react-native-toast-message/lib/src/Toast';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode='contain'
                source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
            />
            <View style={styles.card} />

            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>
            <Text style={styles.price}>${price}</Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <EasyButton
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(props),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} added to Cart`,
                                    text2: "Go to your cart to complete order"
                                })
                        }}
                    >
                        <Text style={{ color: "white" }}>Add</Text>
                    </EasyButton>
                </View>
            ) : <Text style={{ marginBottom: 60, color: 'red', fontSize: 25 }}>Stock out</Text>}
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 45,
        marginBottom: 15,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        width: 65,
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default connect(null, mapDispatchToProps)(ProductCard);