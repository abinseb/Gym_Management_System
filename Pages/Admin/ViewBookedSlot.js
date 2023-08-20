import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, } from "react-native";
import { Button } from "react-native-paper";
import { auth, db } from "../../firebase";
import { Table, Row, Rows, Col } from "react-native-table-component";
import { getDocs, collection, doc, query, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const ViewBookedSlot = () => {
    useEffect(() => {
        showSlotBook()
    }, [])

    const [tabelData, setTableData] = useState([])
    const userName = []
    const slotTime = []


    const showSlotBook = async () => {

        // current date
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = `${day}-${month}-${year}`
        console.log(dateString)

        const slotSec = doc(db, "SlotBook", dateString)
        const allSlotData = await getDoc(slotSec)

        if (allSlotData.exists()) {
            console.log("data exist")
            const slotData = allSlotData.data()
            console.log(slotData)
            for (const [key, value] of Object.entries(slotData)) {
                console.log(slotData[key].slotId)
                // take username from user collection
                const userDoc = doc(db, "User", slotData[key].email)

                const userDocSnap = await getDoc(userDoc)
                if (userDocSnap.exists()) {
                    userName.push(userDocSnap.data().Name)
                }

                // take slot time from slot collection
                const slotDoc = doc(db, "Slot", slotData[key].slotId)
                const slotDocSnap = await getDoc(slotDoc)
                if (slotDocSnap.exists()) {
                    slotTime.push([slotDocSnap.data().startTime, slotDocSnap.data().endTime])
                }


            }
            console.log(userName)
            console.log(slotTime)
        }
        else {
            console.log("data not exist")
        }
        insertIntoTable(userName, slotTime)
    }


    const insertIntoTable = (userName, slotTime) => {

        const tableData = []
        for (let i = 0; i < userName.length; i++) {
            tableData.push([userName[i], slotTime[i][0], slotTime[i][1]])
        }
        setTableData(tableData)
        console.log(tableData)
    }




    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>View Booked Slot</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.table}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={['Name', 'Start Time', 'End Time']} style={styles.head} textStyle={styles.text} />
                            <Rows data={tabelData} textStyle={styles.text} />
                        </Table>
                    </View>
                </View>
            </View>


        </>
    )
}
export default ViewBookedSlot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flex: 1,
        backgroundColor: "#fff",

    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
    },
    body: {
        flex: 5,
        backgroundColor: "#fff",

    },
    table: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",

    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})

