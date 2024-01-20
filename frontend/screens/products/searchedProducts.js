import { Container, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return (
        < >
            {productsFiltered.length > 0 ? (
                <Container style={styles.container}>
                    {productsFiltered.map((item) => (
                        <TouchableOpacity
                            style={{ width: '100%' }}
                            onPress={() => {
                                props.navigation.navigate("Product Detail", { item: item })
                            }}>
                            <View
                                key={item._id.$oid}
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
                                        <Text note>{item.description}</Text>
                                    </VStack>
                                </HStack>

                            </View>
                        </TouchableOpacity>
                    ))}
                </Container>
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width
    },
    list: {
        width: width,
        marginLeft: 15,
    },
    body: {
        margin: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    image: {
        width: 70,
        height: 60,
        backgroundColor: 'transparent',
    }
})

export default SearchedProduct;