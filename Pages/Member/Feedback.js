import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
// feedback
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const Feedback = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigation = useNavigation();

    const submitFeedback = () => {
        if (name && email && feedback) {
            db.ref("/feedback").push({
                name,
                email,
                feedback,
            });
            Alert.alert("Feedback Submitted Successfully");
            navigation.navigate("Home");
        } else {
            Alert.alert("Please fill all the fields");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Feedback</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Feedback"
                    value={feedback}
                    onChangeText={(text) => setFeedback(text)}
                />
                <Button
                    title="Submit"
                    buttonStyle={styles.button}
                    onPress={submitFeedback}
                />
            </View>
        </ScrollView>
    );
}
export default Feedback;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#f4511e",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    form: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        backgroundColor: "#f4511e",
    },
});