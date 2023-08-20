import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import { auth, db } from "../../firebase";
import { getDocs, collection, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

const Profileupdate = ({ navigation }) => {
    const [Name, setUserName] = useState("");
    const [Email, setUserEmail] = useState("");
    const [Height, setUserHeight] = useState("");
    const [Weight, setUserWeight] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    useEffect(() => {
        getUserdetails();
    }, []);
    const getUserdetails = async () => {

        const userDoc = doc(db, "User", auth.currentUser.email);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            setUserName(user.Name);
            setUserEmail(user.email);
            setUserHeight(user.Height);
            setUserWeight(user.Weight);

        }
    }
    const updateProfile = async () => {
        updateDoc(doc(db, "User", auth.currentUser.email), {
            Height: height,
            Weight: weight,
        }).then(()=>{
            alert("update successfully")
        })
    }

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>Update Profile</Text>
                    <Text style={styles.text}>{Name}</Text>
                    <Text style={styles.text}>Height :{Height}</Text>
                    <Text style={styles.text}>Weight :{Weight}</Text>

                    <TextInput style={styles.input}
                        label="Height"
                        value={height}
                        onChangeText={(text) => setHeight(text)}
                    />
                    <TextInput style={styles.input}
                        label="Weight"
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                    />
                    <Button style={styles.button} mode="contained" onPress={() => updateProfile()}> Update Profile</Button>
                </View>

            </ScrollView>
        </View>
    )
}
export default Profileupdate
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    button: {
        marginBottom: 10,
    },
    listItem: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    display: {
        fontSize: 18,
    }


});