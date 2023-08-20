import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, Alert, FlatList, Modal } from "react-native";
import { auth, db } from "../../firebase";
import { Table, Row, Rows, Col } from "react-native-table-component";
import { getDocs, collection, doc, query, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { TextInput } from "react-native-paper";
const ProductBooking = () => {
    useEffect(() => {
        showProduct()
    }, [])
    const [productList, setProductList] = useState([])
    const [quantity, setQuantity] = useState(0)
    // const [totalPrice, setTotalPrice] = useState(0)
    const [quantityBox, setQuantityBox] = useState(false)
    const [productID, setProductID] = useState('')


    const showProduct = async () => {
        const q = query(collection(db, "Product"));
        var list = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            list.push({
                id: doc.id,
                name: doc.data().ProductName,
                price: doc.data().Price,
                netweight: doc.data().Netweight,
                Mfgdate: doc.data().Mfgdate,
                Expdate: doc.data().Exprdate,
                Quantity: doc.data().Quantity,
            })
        })
        setProductList(list)
        console.log("------------", productList)
    }

    const bookOrder = async () => {
        // check if quantity is greater than 0 and less than available quantity and quantity is natural number
        var qttt = parseFloat(quantity) % 1

        if (quantity > 0 && qttt == 0) {
            console.log("-----------------------------------------------------------------------", qttt)
            // get product details


            const docRef = doc(db, "Product", productID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                var temp = docSnap.data().Quantity - quantity
                var totalPrice = docSnap.data().Price * quantity
                if (temp >= 0) {

                    // add order to firestore


                    // Alert.alert("Product Booked")
                    // alert box for confirmation
                    Alert.alert(
                        "Product Booked",
                        "Total Price: " + totalPrice,
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    [addToorders(productID, quantity, totalPrice),
                                    updateDoc(docRef, {
                                        Quantity: temp
                                    })
                                    ]
                                }
                            },
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"

                            }
                            // cancel button

                        ],
                        { cancelable: false }

                    )
                    //
                    setQuantity(0)
                    setQuantityBox(false)
                }
                else {
                    Alert.alert("Quantity not available")
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        else {
            Alert.alert("Quantity must be valid")
        }
    }

    const addToorders = async (productID, quantity, totalPrice) => {
        // take current date
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var user1 = auth.currentUser.email
        // take current date
        console.log("-----------------------------------------------------------------------", dateTime)
        try {
            const docRef = doc(db, "User", user1);
            const docSnap = await getDoc(docRef);
            await updateDoc(docRef, {
                Orders: arrayUnion({
                    ProductID: productID,
                    Quantity: quantity,
                    TotalPrice: totalPrice,
                    Date: dateTime,
                    Status: "Pending"
                })
            })
        }
        catch (error) {
            console.log("Error adding document: ", error);
        }
    }




    return (
        <>
            {/* book Products in card */}
            <FlatList
                data={productList}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.count}>Price: {item.price}</Text>
                            <Text style={styles.count}>Netweight: {item.netweight}</Text>
                            <Text style={styles.count}>Mfgdate: {item.Mfgdate}</Text>
                            <Text style={styles.count}>Expdate: {item.Expdate}</Text>
                            <Text style={styles.count}>Quantity: {item.Quantity}</Text>
                            {/* read quantity */}

                            {/* calculate total price */}


                            <View style={styles.button}>
                                <Button
                                    title="Book"
                                    onPress={() => {
                                        [setQuantityBox(true), setProductID(item.id)]
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )}
            />
            {/* book Products in card */}
            {/* Modal for quantity */}
            <Modal
                animationType="slide"
                transparent={true}

                visible={quantityBox}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setQuantityBox(!quantityBox);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter Quantity</Text>
                        <TextInput
                            label="Quantity"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text)}
                            mode="outlined"
                            keyboardType="numeric"
                        />
                        <View style={styles.button}>
                            <Button
                                title="Book"
                                onPress={() => {
                                    [setQuantityBox(false), bookOrder()]
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>




        </>
    )
}

export default ProductBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8eaed",
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: "center",
        color: "#3399ff",
        fontWeight: "bold",
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: "center",
        color: "#6666ff",
    },
    card: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: "46%",
        marginHorizontal: 10,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22,
        margin: 20,

    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },

});
