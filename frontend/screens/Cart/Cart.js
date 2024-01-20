import {
    Button, Container, Heading, Text,
    VStack
} from 'native-base';
import React from "react";
import {
    Dimensions, StyleSheet, TouchableOpacity, View
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import { SwipeListView } from 'react-native-swipe-list-view';
import EasyButton from '../../shared/StyledComponents/EasyButton';
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import * as actions from '../../Redux/Actions/cartActions';
import CartItem from './CartItem';

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
    var total = 0;
    props.cartItems.forEach((cart) => {
        return (total += cart.product.price);
    })

    return (
        <>
            {props.cartItems.length ? (

                <Container style={styles.container}>

                    <Heading style={{
                        alignSelf: "center",
                        marginLeft: 80,
                    }}>Cart</Heading>

                    <ScrollView
                        width={width}
                        marginBottom={55}
                    >
                        <SwipeListView
                            data={props.cartItems}
                            keyExtractor={(data) => data.product.toString()}

                            renderItem={({ item }) => (
                                <View style={styles.cartItem}>
                                    <CartItem item={item} />
                                </View>
                            )}
                            renderHiddenItem={({ item }) => (

                                <View style={styles.hiddenContainer}>
                                    <TouchableOpacity
                                        style={styles.hiddenButton}
                                        onPress={() => props.removeFromCart(item)}
                                    >
                                        <View >
                                            <Icon name="trash" color={"white"} size={30} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            )}

                            disableRightSwipe={true}
                            leftOpenValue={75}
                            rightOpenValue={-75}

                            previewOpenDelay={3000}
                            friction={1000}
                            tension={40}
                            stopLeftSwipe={75}
                            previewRowKey={'0'} previewOpenValue={-40}
                        />

                    </ScrollView>

                    <VStack style={styles.bottomContainer}>

                        <Text style={styles.price}>$ {total.toFixed(2)}</Text>

                        <EasyButton
                            danger
                            medium
                            onPress={() => props.clearCart()}
                        >
                            <Text style={{ color: "white" }}>Clear</Text>
                        </EasyButton>

                        <EasyButton
                            primary
                            medium
                            // style={styles.checkout}
                            onPress={() => props.navigation.navigate('Checkout')}
                        >
                            <Text style={{ color: "white" }}>Checkout</Text>
                        </EasyButton>

                    </VStack>

                </Container>

            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty!</Text>
                    <Text>Add products to your cart to get started</Text>
                </Container>
            )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}


const styles = StyleSheet.create({
    container: {
        width: width,
        position: 'relative',
        height: '100%',
    },
    emptyContainer: {
        marginLeft: 40,
        marginTop: -40,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: width,
        marginLeft: 15,
    },
    image: {
        width: 70,
        height: 60,
        backgroundColor: 'transparent',
    },
    body: {
        width: width - 105,
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomContainer: {
        width: width,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        elevation: 30,
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'white'
    },
    price: {
        fontSize: 18,
        margin: 15,
        color: 'red'
    },
    checkout: {
        marginRight: 15
    },
    cartItem: {
        backgroundColor: "white",
    },
    hiddenContainer: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    hiddenButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: 75,
        backgroundColor: 'red',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);