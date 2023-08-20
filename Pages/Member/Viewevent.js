import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView,
    StyleSheet,
    FlatList
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { db } from "../../firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";








const Viewevent = ({ navigation }) => {

    const [Event, setEvents] = useState([]);
    const [id, setId] = useState("");
    const [Title, setTitle] = useState("");

    useEffect(() => {
        getEvents();

    }, []);
    const getEvents = async () => {
        setEvents([]);
        console.log("=======================Events=====================")
        const querySnapshot = await getDocs(collection(db, "Event"));
        var list = []
        querySnapshot.forEach((doc) => {
            list.push({
                id: doc.id,
                Title: doc.data().Title,
                Startdate: doc.data().StartDate,
                Enddate: doc.data().EndDate,
                Description: doc.data().Description,
                Venue: doc.data().Venue,
                Link: doc.data().Link,
            });
        }
        );
        // console.log(list)
        // sort the list by date



        setEvents(list);
        console.log("=====================================");
        console.log(Event);

    };

    return (
        <View>
            <FlatList
                data={Event}
                renderItem={({ item }) => (
                    <View style={styles.listItem} key={item.key}>
                        <Text style={styles.listItemText1}>Title :{item.Title}</Text>
                        <Text style={styles.listItemText}>Startdate :{item.Startdate}</Text>
                        <Text style={styles.listItemText}>Enddate :{item.Enddate}</Text>
                        <Text style={styles.listItemText}>Description :{item.Description}</Text>
                        <Text style={styles.listItemText}>Venue :{item.Venue}</Text>
                        <Text style={styles.listItemText}>Link :{item.Link}</Text>
                    </View>
                )}
            />



        </View>
    )
}
export default Viewevent;

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
        fontSize: 12,
        borderRadius: 10,
        elevation: 5,
        margin: 10,
    },
    listItemText: {
        fontSize: 14,
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

        shadowRadius: 4,
        elevation: 5
    },
    listItemText1: {
        fontSize: 18,
        fontWeight: "bold",
    },
});