import React, { useState, useEffect } from "react";
import { TextInput, Button, Appbar } from "react-native-paper";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Alert,
    RefreshControl,
    Modal,
} from 'react-native'
import { collection, doc, setDoc, getDocs, getDoc, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { Feather } from "@expo/vector-icons";


var ProductID = '';

const ViewProduct = ({ navigation }) => {
    const [productname, setproductname] = useState('');
    const [netweight, setnetweight] = useState('');
    const [Quantity, setquantity] = useState('');
    const [price, setprice] = useState('');
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        showPRoduct();
    }, [])

    const showPRoduct = async () => {
        var temp = [];
        const q = query(collection(db, "Product"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            temp.push({ ...doc.data(), id: doc.id });

        });
        setProduct(temp);
    }

    const deleteProduct = async (id) => {
        // confirm it using alert
        console.log("id", id);
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

                {
                    text: "OK", onPress: async () => {
                        try {
                            console.log("id", id);
                            deleteDoc(doc(db, "Product", id))
                                .then(() => {
                                    alert("Deleted")
                                })

                            // alert("Product Deleted Successfully");
                        }
                        catch (e) {
                            console.log("error");
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }
    const [modelView, setModelView] = useState(false);

    const showUpdate = (id) => {
        console.log("id", id);
        setModelView(true);
        ProductID = id;
    }

    // update product


    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="View Product" />
            </Appbar.Header>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>View Product</Text>


                <View style={styles.container}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={showPRoduct}
                            />}
                        data={product}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.Head}>Product Name: {item.ProductName}</Text>
                                    <Feather name="edit" size={20} color="black" onPress={() => showUpdate(item.id)} />
                                </View>
                                <Text style={styles.text}>Net Weight: {item.Netweight}</Text>
                                <Text style={styles.text}>Quantity: {item.Quantity}</Text>
                                <Text style={styles.text}>Price: {item.Price}</Text>
                                <Text style={styles.text}>Mfg Date: {item.Mfgdate}</Text>
                                <Text style={styles.text}>Exp Date: {item.Exprdate}</Text>
                                {/* delete button */}
                                <Button
                                    mode="contained"
                                    onPress={() => deleteProduct(item.id)}
                                    style={{ margin: 10 }}
                                >
                                    Delete
                                </Button>
                            </View>
                        )}

                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modelView}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModelView(!modelView);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Update Product</Text>
                        <TextInput
                            label="Product Name"
                            value={productname}
                            mode='outlined'
                            onChangeText={(text) => setproductname(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Net Weight"
                            value={netweight}
                            mode='outlined'
                            onChangeText={(text) => setnetweight(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Quantity"
                            value={Quantity}
                            mode='outlined'
                            onChangeText={(text) => setquantity(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Price"
                            value={price}
                            mode='outlined'
                            onChangeText={(text) => setprice(text)}
                            style={styles.input}
                        />
                        <Button
                            mode="contained"
                            onPress={() => {
                                updateDoc(doc(db, "Product", ProductID), {
                                    ProductName: productname,
                                    Netweight: netweight,
                                    Quantity: Quantity,
                                    Price: price,
                                })
                                    .then(() => {
                                        alert("Updated")
                                    })


                                setModelView(!modelView);
                                showPRoduct();
                            }}

                            style={{ margin: 10 }}
                        >
                            Update
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => {
                                setModelView(!modelView);
                            }}
                            style={{ margin: 10 }}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>

        </>
    )
}
export default ViewProduct;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 10,
    },
    Head: {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        // margin: 5,
    },
    text: {
        fontSize: 15,
        color: '#000',
        // margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",

        // shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        // textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        width: 300,
        margin: 10,
    },

});