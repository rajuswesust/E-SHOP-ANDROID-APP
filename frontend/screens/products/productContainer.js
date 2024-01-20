import { Container, Icon, Input, ScrollView, VStack } from "native-base";
import React, { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native"
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import Banner from "../../shared/banner";
import CategoryFilter from "./categoryFilter";
import ProductList from "./productList";
import SearchedProduct from "./searchedProducts";

var { width, height } = Dimensions.get("window");

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products...
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log("Product API call error")
                    })

                // Category...
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data.categoryList)
                        //console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(" Categories API call error", err)
                    })

                return () => {
                    setProducts([]);
                    setProductsFiltered([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState();
                }
            },
            [],
        )
    ))

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };
    const openList = () => {
        setFocus(true);
    };
    const onBlur = () => {
        setFocus(false);
    };

    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category._id === ctg),
                        setActive(true)
                    )
                ]
        }
    }

    return (
        <>
            {loading == false ? (
                <View>
                    <VStack w="95%" space={5} alignSelf="center" marginBottom={2} marginTop={2} >

                        <Input
                            borderRadius={20}
                            backgroundColor={'gray.100'}
                            placeholder="Search Products"
                            width="100%"
                            InputLeftElement={<Icon as={MaterialIcons} name="search" size='2xl' />}
                            InputRightElement={focus == true ? <Icon onPress={onBlur} as={MaterialIcons} name="cancel" size='2xl' /> : null}
                            onFocus={openList}
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </VStack>

                    {focus == true ? (
                        <ScrollView>
                            <SearchedProduct
                                navigation={props.navigation}
                                productsFiltered={productsFiltered}
                            />
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            <View >
                                <View>
                                    <Banner />
                                </View>

                                <CategoryFilter
                                    categories={categories}
                                    CategoryFilter={changeCtg}
                                    productsCtg={productsCtg}
                                    active={active}
                                    setActive={setActive}
                                />

                                {productsCtg.length > 0 ? (
                                    <View style={styles.listContainer1}>
                                        {productsCtg.map((item) => {
                                            return (
                                                <ProductList
                                                    navigation={props.navigation}
                                                    key={item._id}
                                                    item={item}
                                                />
                                            )
                                        })}
                                    </View>
                                ) : (
                                    <View style={[styles.listContainer1, styles.center, { height: height / 2 }]}>
                                        <Text>No products found</Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    )}
                </View>
            ) : (
                <View style={[styles.center,styles.spinner, { backgroundColor: "#f2f2f2" }]}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
        marginTop: 10,
        marginBottom: 200,
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        marginTop: -230,
        flexWrap: 'wrap',
        backgroundColor: "gainsboro"
    },
    listContainer1: {
        marginBottom: 140,
        marginTop: 370,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export default ProductContainer;