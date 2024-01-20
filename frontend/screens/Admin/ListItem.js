import { ScrollView } from "native-base"
import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    StyleSheet,
    Button,
    Modal
} from "react-native"
import EasyButton from "../../shared/StyledComponents/EasyButton"
import Icon from "react-native-vector-icons/FontAwesome"

var { width } = Dimensions.get("window")

const ListItem = (props) => {

    const item = props;
    const [modalVisible, setModalVisible] = useState(false)
    return (

        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor="#E8E8E8"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <View style={{ padding: 10 }}>
                            <EasyButton
                                medium
                                secondary
                                onPress={() => [
                                    props.navigation.navigate("ProductForm", { item: props }),
                                    setModalVisible(false)
                                ]}
                            >
                                <Text style={styles.textStyle}>Edit</Text>
                            </EasyButton>
                            <EasyButton
                                medium
                                danger
                                onPress={() => [props.delete(props._id), setModalVisible(false)]}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </EasyButton>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate("Product Detail", { item: item })
                }
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro"
                }]}
            >
                <Image
                    source={{
                        uri: item.image
                            ? item.image
                            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item}>{item.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{item.category.name}</Text>
                <Text style={styles.item}>$ {item.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 25,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
})


export default ListItem;