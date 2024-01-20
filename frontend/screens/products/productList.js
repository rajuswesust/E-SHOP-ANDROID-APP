import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import ProductCard from './productCard';

var { width } = Dimensions.get("window");

const ProductList = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() =>
                props.navigation.navigate("Product Detail", {item: item})
            }
        >
            <View style={{
                width: width / 2,
                backgroundColor: 'gainsboro'
            }}
            >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductList;