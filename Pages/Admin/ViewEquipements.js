import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Modal } from "react-native";

import { db } from "../../firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { Button, TextInput } from "react-native-paper";

const ViewEquipements = ({ navigation }) => {
    const [equipements, setEquipements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        getEquipments();
    }, []);


    const getEquipments = async () => {
        const querySnapshot = await getDocs(collection(db, "equipment"));
        var list = []
        querySnapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                supplier: doc.data().supplier,
                date: doc.data().date,
                category: doc.data().category,
                key: doc.id,
            });
        }
        );
        console.log(list)
        setEquipements(list);
        setLoading(false);
        console.log(equipements);

    };

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <>
            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <Text style={styles.text}>Equipements</Text>
                    <View style={styles.list}>
                        {equipements.map((item) => {
                            return (
                                <View style={styles.listItem} key={item.key}>
                                    <Text style={styles.listItemText}>Name :{item.name}</Text>
                                    <Text style={styles.listItemText}>Price :{item.price}</Text>
                                    <Text style={styles.listItemText}>ID :{item.id}</Text>
                                    <Text style={styles.listItemText}>Supplier :{item.supplier}</Text>
                                    <Text style={styles.listItemText}>Date :{item.date}</Text>
                                    <Text style={styles.listItemText}>Category :{item.category}</Text>
                                    <Button
                                        label='Delete'
                                        mode="contained"
                                        onPress={() => {
                                            Alert.alert(
                                                'Delete Equipment',
                                                'Are you sure?',
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        onPress: () => console.log('Cancel Pressed'),
                                                        style: 'cancel'
                                                    },
                                                    {
                                                        text: 'OK',
                                                        onPress: () => {
                                                            deleteDoc(doc(db, "equipment", item.id));
                                                            console.log("deleted")
                                                        }
                                                    }
                                                ],
                                                { cancelable: false }
                                            );

                                        }}
                                    >Delete</Button>

                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>


        </>
    )
}
export default ViewEquipements

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    listItem: {
        // flexDirection: "row",
        padding: 20,
        borderBottomWidth: 1,
        borderColor: "#eee",
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,

    },
    listItemText: {
        fontSize: 18,
    },
});
