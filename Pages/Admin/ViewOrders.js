import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, SafeAreaView, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { auth, db } from "../../firebase";
import { getDocs, collection, doc, query, getDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";


const ViewOrders = () => {
    useEffect(() => {
        console.log("-------useEffect-----")
        showOrders()
    }, [])

    const [orderList, setOrderList] = useState([]);
    const [productName, setProductName] = useState([]);

    const showOrders = async () => {
        const q = query(collection(db, "User"));
        var list = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docs) => {
            if (docs.data().Orders) {
                if (docs.data().Orders.length > 0) {
                    const orders = docs.data().Orders;
                    for (const order of orders) {
                        const productNamei = await productDetails(order.ProductID);
                        list.push({
                            id: docs.id,
                            user: docs.data().Name,
                            name: productNamei,
                            price: order.TotalPrice,
                            netweight: order.Quantity,
                            date: order.Date,
                            status: order.Status,
                            ProductID: order.ProductID
                        })
                    }
                    setOrderList(list)
                }

            }
        })

        console.log('0000000000000000000000000000000000', orderList)
    }

    const productDetails = async (id) => {
        console.log('detailsssssssssssssssssssssssssssssssssssssssssssss')
        const docRef = doc(db, "Product", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const productName = docSnap.data().ProductName;
            setProductName(prevProductNames => [...prevProductNames, productName]);
            return productName;
        } else {
            console.log("No such document!");
            return "";
        }
    }

    const updateStatus = async (id, productID) => {
        const docRef = doc(db, "User", id);
        console.log("-------id-----", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const orders = docSnap.data().Orders;
            for (const order of orders) {
                console.log("-------order-----", order.ProductID, '----', productID);

                if (order.ProductID == productID) {
                    order.Status = "Approved";
                    console.log("-------order-----", order);
                    break;
                }

            }
            await updateDoc(docRef, {
                Orders: orders
            });
            // showOrders();
        } else {
            console.log("No such document!");
        }
    }


    // useEffect(() => {
    //     console.log("-------orderList-----", orderList);
    // }, [orderList]);

    return (
        <>
            <View>
                <Text>View Orders</Text>
                <FlatList
                    data={orderList}
                    renderItem={({ item }) => (
                        <View
                            style={styles.Card}
                            horizontal={false}
                            flexDirection="row"
                        >
                            <View>
                                <Text style={styles.CardText}> Username : {item.user}</Text>
                                <Text style={styles.CardText}> Product Name : {item.name}</Text>
                                <Text style={styles.CardText}>Amount : {item.price}</Text>
                                <Text style={styles.CardText}>Quantity : {item.netweight}</Text>
                                <Text style={styles.CardText}>Date : {item.date}</Text>
                                <Text style={styles.CardText}>Status : {item.status}</Text>
                            </View>
                            {/* buttons for approve or delete */}
                            <View>
                                <Button
                                    mode="contained"
                                    onPress={() => {
                                        Alert.alert(
                                            "Approve Order",
                                            "Are you sure you want to approve this order?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "OK",
                                                    // update status of order to approved in user collection
                                                    onPress: () => updateStatus(item.id, item.ProductID)
                                                }
                                            ]
                                        );
                                    }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={() => {
                                        Alert.alert(
                                            "Cancel Order",
                                            "Are you sure you want to Cancel this order?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "OK", onPress: () => console.log("OK Pressed") }
                                            ]
                                        );
                                    }}
                                >
                                    Cancel
                                </Button>
                            </View>
                        </View>
                    )}
                />
            </View>
        </>
    )
}

export default ViewOrders;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    Card: {
        backgroundColor: "#fff",

        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    CardText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",


    }

});

