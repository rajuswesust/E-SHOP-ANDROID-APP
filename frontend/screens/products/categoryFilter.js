import { Badge, HStack, Center, ListItem, Stack, Text } from 'native-base';
import React from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: '#f2f2f2', marginBottom: -370 }}
        >
            <HStack style={{ margin: 0, padding: 0, borderRadius: 0 }}>

                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.CategoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, { margin: 5 }, { borderRadius: 20 },
                        props.active == -1 ? styles.active : styles.inactive
                        ]}
                        colorScheme='error'
                        variant='solid'
                    >
                        <Text style={{ color: 'white' }}>All</Text>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            props.CategoryFilter(item._id),
                                props.setActive(props.categories.indexOf(item))
                        }}
                    >
                        <Badge
                            style={[styles.center, { margin: 5 }, { borderRadius: 20 },
                            props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                            ]}
                            colorScheme='error'
                            variant='solid'
                        >
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}

            </HStack>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;
