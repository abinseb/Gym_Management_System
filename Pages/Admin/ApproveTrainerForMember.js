import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Modal, FlatList } from "react-native";

import { auth, db } from "../../firebase";
import { getDoc, doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Button, TextInput } from "react-native-paper";

const ApproveTrainerForMember = ({ navigation }) => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState("");
    const [name, setName] = useState("");


    useEffect(() => {
        getMember();
        console.log(auth.currentUser.email)
    }, []);

    const getMember = async () => {
        setName([]);
        const q = query(collection(db, "User"), where("trainerId", "==", auth.currentUser.email,));
        var list = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            if(doc.data().trainerId==auth.currentUser.email)
            {
                // setId(doc.id);
                if (doc.data().requestStatus == "pending") {
                    console.log('--------------tress')
                    list.push({
                        id: doc.id,
                        name: doc.data().Name,
                        email: doc.data().Email,
                    })
                }
            }
        });
        setName(list);
        console.log(name);
    }

    const approveMember = async (id) => {
        const userRef = doc(db, "User", id);
        await updateDoc(userRef, {
            requestStatus: "approved",
        });
        Alert.alert("Member Approved Successfully");
        getMember();
    };

    const rejectMember = async (id) => {
        const userRef = doc(db, "User", id);
        await updateDoc(userRef, {
            requestStatus: "",
            trainerId: "",
        });
        Alert.alert("Member Rejected Successfully");
        getMember();
    };



    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Trainers</Text>
                <View style={styles.list}>
                    <FlatList
                        data={name}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>Name :{item.name}</Text>
                                <Text style={styles.listItemText}>Email :{item.email}</Text>
                                <View style={styles.button}>
                                    <Button
                                        mode="contained"
                                        onPress={() => {
                                            approveMember(item.id);
                                        }}
                                    >
                                        Approve
                                    </Button>
                                    </View>
                                <View style={styles.button2}>

                                    <Button
                                        mode="contained"
                                        onPress={() => {
                                            rejectMember(item.id);
                                        }}
                                    >
                                        Reject
                                    </Button>

                                </View>

                            </View>
                        )}
                    />




                </View>
            </View>

        </>
    );
}

export default ApproveTrainerForMember;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    list: {
        marginTop: 20,
    },
    listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#f0f0f0",
        flexDirection:"column",
    },
    button:{
        margin:10,

    },
    button2:{
        margin:10
    }
});
