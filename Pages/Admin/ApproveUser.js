import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { getDoc, updateDoc, getDocs, doc, query, collection, } from "firebase/firestore";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Feather } from "@expo/vector-icons";
import { async } from "@firebase/util";

var k = 0
const ApproveUser = () => {
    useEffect(() => {
        console.log("he")
        showUser();
    }, [])

    const userID = [];
    const userName = [];
    const userEmail = [];
    const userPhone = [];
    const userDOB = [];
    const userGender = [];
    const userPassword = [];


    const showUser = async () => {

        const q = query(collection(db, "User"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            if (doc.data().Status == "pending" && doc.data().role == "member") {
                console.log(doc.id, " => ", doc.data());
                userID.push(doc.id);
                userName.push(doc.data().Name);
                userEmail.push(doc.data().Email);
                userPhone.push(doc.data().Contact);
                userDOB.push(doc.data().DOB);
                userGender.push(doc.data().Gender)
                userPassword.push(doc.data().Password)
                k++;

            }
        })
        if (k > 0) {
            insertToTable(userID, userName, userEmail, userPhone, userDOB, userGender, userPassword);
        }
        // setTrainer(temp);
    }

    const [userTable, setUserTable] = useState([])



    const [tableHead, setTableHead] = useState(['Name', 'Email', 'Phone', 'DOB', 'Gender', 'Action'])
    const insertToTable = (userID, userName, userEmail, userPhone, userDOB, userGender, userPassword) => {
        setUserTable([])
        const userData = []
        for (let i = 0; i < userID.length; i++) {
            var temp = []
            temp.push([userName[i], userEmail[i], userPhone[i], userDOB[i], userGender[i],
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10
                }}
            >
                <Feather name="trash-2" size={20} color="black" onPress={() => deleteUSer(userID[i])} />
                <Feather name="check-circle" size={20} color="black" onPress={() => addUser(userEmail[i], userPassword[i])} />
            </View>
            ])

        }
        setUserTable(temp)
    }
    const deleteUSer = (userID) => {
        console.log("user", userID)
    }


    // add user


    const addUser = async (email, Password) => {
        console.log("email->", email, "-Password->", Password)
        try {
            const q = doc(db, "User", email)
            await updateDoc(q, {
                Status: "Approve"
            })
                .catch((error) => {
                    console.log("updation error")

                });
            createUserWithEmailAndPassword(auth, email, Password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("Approve User")
                    // ...
                })
        }
        catch (error) {
            console.log("Errrrrorrorrrr")
        }


    }

    return (
        <>
            {/* <View style={styles.container}>
                <Text style={styles.text}>Approve User</Text>
            </View> */}
            <ScrollView
                horizontal={true}
                style={{
                    backgroundColor: "white",
                    padding: 10
                }}
            >
                {
                    k > 0 ?
                        <View
                            style={{
                                backgroundColor: "#fff",
                                marginHorizontal: 5,
                                marginTop: 20,
                                borderRadius: 10,
                                padding: 20,
                                elevation: 5,
                            }}
                        >
                            <Table
                                borderStyle={{
                                    borderWidth: 2,
                                    borderColor: "#c8e1ff"
                                }}
                                style={{ width: 500 }}
                            >
                                <Row
                                    data={tableHead}
                                    style={styles.head}
                                    textStyle={styles.text}
                                // flexArr={[1, 1, 1, 1 , 1, 1]}
                                />
                                <TableWrapper>
                                    <Rows
                                        data={userTable}
                                        style={styles.row}
                                        textStyle={styles.text}

                                    />
                                </TableWrapper>
                            </Table>
                        </View>
                        :
                        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>No User Found</Text>

                }
            </ScrollView>

        </>
    )
}
export default ApproveUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    head: {
        backgroundColor: "#f1f8ff",
        height: 50,
        // width: 200
    },
    text: {
        margin: 6
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#FFF1C1",
        // width: 200
        // height: 50,

        // width: 'aut'
    },
});
