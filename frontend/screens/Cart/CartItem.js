import {
    HStack,
    Text,
    VStack
} from "native-base";
import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    View
} from "react-native";

var { height, width } = Dimensions.get("window");

const CartItem = ({ item }) => {
    console.log(item.product.name)
    item = item.product;
    return (
        <View
            key={Math.random()}
            avatar
            width={width}
        >
            <HStack style={styles.list}>
                <Image
                    style={styles.image}
                    resizeMode='contain'
                    source={{
                        uri: item.image ?
                            item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                />
                <VStack style={styles.body}>
                    <Text>{item.name}</Text>
                    <Text>$ {item.price}</Text>
                </VStack>
            </HStack>
        </View>
    );
};

const styles = StyleSheet.create({
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
})

export default CartItem;