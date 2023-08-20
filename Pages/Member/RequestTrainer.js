import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { getDocs, collection, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { and, or } from "react-native-reanimated";


const RequestTrainer = () => {
    useEffect(() => {
        // getTrainers()

        checkTrainer()
    }, [])

    const [selectedValue, setSelectedValue] = useState('option1');
    const [trainers, setTrainers] = useState([])
    const [check, setCheck] = useState(true)

    const getTrainers = async () => {
        setCheck(false)
        setTrainers([])
        var temp = []
        // const q = query(collection(db, "User"), where("role", "==", "trainer", "or", "Admin"));
        const q = query(collection(db, "User"), where("role", "in", ["trainer", "Admin"]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            temp.push({ trainerId: doc.id, trainerName: doc.data().Name })
        })
        setTrainers(temp)
        console.log('===================Trainers=======================', trainers)
    }


    const RequestTrainerForUser = async () => {
        const userDoc = doc(db, "User", auth.currentUser.email);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            const user = userDocSnap.data();

            const userRef = doc(db, "User", auth.currentUser.email);
            await updateDoc(userRef, {
                trainerId: selectedValue,
                requestStatus: "pending"
            });
            Alert.alert("Trainer Requested Successfully")

        }
    }

    const [trainerId, setTrainerId] = useState({})
    const checkTrainer = async () => {
        setCheck(true)
        const userDoc = doc(db, "User", auth.currentUser.email);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            if (user.trainerId != '') {
                console.log("-------------")
                const trainerDoc = doc(db, "User", user.trainerId);
                const trainerDocSnap = await getDoc(trainerDoc);
                if (trainerDocSnap.exists()) {
                    var trainer = trainerDocSnap.data().Name;
                }

                if (user.requestStatus == 'pending') {
                    console.log('--------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---------',)
                    setTrainerId({
                        trainerId: trainer,
                        requestStatus: user.requestStatus
                    })
                }
                else {
                    console.log('-------------------approve---------------------')
                    setTrainerId({
                        trainerId: trainer,
                        requestStatus: user.requestStatus
                    })
                }
            }
            else {
                getTrainers()
            }
            console.log('-----------------', trainerId, auth.currentUser.email)
        }
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Request Trainer</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.action}>
                        {
                            check ?
                                <View>
                                    <Text> Trainer name : {trainerId.trainerId}</Text>
                                    <Text> Request Status : {trainerId.requestStatus}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.text_footer}>Select Trainer</Text>
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        {
                                            trainers.map((trainer) => (
                                                <Picker.Item label={trainer.trainerName} value={trainer.trainerId} />
                                            ))
                                        }
                                    </Picker>
                                    <Button
                                        mode="contained"
                                        onPress={() => RequestTrainerForUser()}
                                    >
                                        Request
                                    </Button>
                                </View>
                        }
                    </View>

                </View>
            </View>

        </>
    )
}
export default RequestTrainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        // flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {

        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',

        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
