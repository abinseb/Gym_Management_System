import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, } from 'react-native'
import { Button } from 'react-native-paper'
import { auth, db } from '../../firebase'
import { doc, getDoc, getDocs, setDoc, query, collection, deleteDoc } from 'firebase/firestore'
import { Picker } from '@react-native-picker/picker';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
const BookSlot = () => {
    useEffect(() => {
        showSlots()
        deleteSlot()
    
        // checkAlreadyBooked()

    }, [])

    const [selectedValue, setSelectedValue] = useState('');
    const [tainers, setTrainers] = useState([])
    const [alreadyBooked, setAlreadyBooked] = useState(false)
    const [endTime,setEndTime]=useState('');
    const [slotStratTime,setSlotStartTime]=useState('')

    // const checkAlreadyBooked = async () => {
    //     // take tommorow date

    //     const date = new Date();
    //     date.setDate(date.getDate() + 1);
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1;
    //     const day = date.getDate();
    //     const dateString = `${day}-${month}-${year}`;
    //     console.log(dateString)


    //     const userDoc = doc(db, "SlotBook", dateString);
    //     const userDocSnap = await getDoc(userDoc);
    //     if (userDocSnap.exists()) {
    //         const slotDoc = doc(db, "Slot")
    //         const slotDocSnap = await getDoc(slotDoc);
    //         if (slotDocSnap.exists()) {
    //             const slot = slotDocSnap.data();
    //             console.log(slot)
    //             if (slot[auth.currentUser.email]) {
    //                 setAlreadyBooked(true)
    //             }
    //         }

    //     }
    // }
    const [slotTimes, setSlotTimes] = useState([])

    const showSlots = async () => {
        setSlotTimes([])
        var temp = []
        const q = query(collection(db, "Slot"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            temp.push({ slotId: doc.id, slotStartTime: doc.data().startTime, slotEndTime: doc.data().endTime, slotCapacity: doc.data().Capacity })
        })
        setSlotTimes(temp)
        console.log(slotTimes)
    }

    // view slot
   

    // book slot for user
    const bookSlotForUser = async () => {
        const userDoc = doc(db, "User", auth.currentUser.email);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            const date = new Date();
            date.setDate(date.getDate() + 1);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateString = `${day}-${month}-${year}`;
            console.log(dateString)
            const slotDoc = doc(db, "Slot", selectedValue);
            const slotDocSnap = await getDoc(slotDoc);
            if (slotDocSnap.exists()) {
                const slot = slotDocSnap.data();
                console.log(slot)
                if (slot.Capacity > 0) {
                    const slotBookDoc = doc(db, "SlotBook", dateString);
                    const slotBookDocSnap = await getDoc(slotBookDoc);
                    if (slotBookDocSnap.exists()) {
                        const slotBook = slotBookDocSnap.data();
                        console.log(slotBook)
                        if (slotBook[auth.currentUser.email]) {
                            Alert.alert("You have already booked a slot for tomorrow")
                        }
                        else {
                            await setDoc(doc(db, "SlotBook", dateString), {
                                [auth.currentUser.email]: {
                                    // name: user.name,
                                    email: auth.currentUser.email,
                                    slotId: selectedValue,
                                    slotStartTime: slot.startTime,
                                    slotEndTime: slot.endTime
                                }
                            }, { merge: true })

                            await setDoc(doc(db, "Slot", selectedValue), {
                                Capacity: slot.Capacity - 1
                            }, { merge: true })
                            Alert.alert("Slot Booked")
                        }
                    }
                    else {
                        await setDoc(doc(db, "SlotBook", dateString), {
                            [auth.currentUser.email]: {
                                // name: user.name,
                                email: auth.currentUser.email,
                                slotId: selectedValue,
                                slotStartTime: slot.startTime,
                                slotEndTime: slot.endTime
                            }
                        }, { merge: true })
                        setEndTime(slot.endTime)
                        setSlotStartTime(slot.startTime)
                        console.log(slotStratTime,endTime);
                        await setDoc(doc(db, "Slot", selectedValue), {
                            Capacity: slot.Capacity - 1
                        }, { merge: true })
                        Alert.alert("Slot Booked")
                    }
                }
                else {
                    Alert.alert("Slot is full")
                }
            }

        }
    }


    // delete slot when date is less than current date
    const deleteSlot = async () => {
        var count = 0
        console.log("delete slot")
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() + 1;
        const dateString = `${day}-${month}-${year}`;
        console.log(dateString)
        // find length of the dateString field
        const slotBookDoc = doc(db, "SlotBook", dateString);
        try {
            const slotBookDocSnap = await getDoc(slotBookDoc);

            if (slotBookDocSnap.exists()) {

                const slotBook = slotBookDocSnap.data();
                console.log("-----", slotBook)
                for (const [key, value] of Object.entries(slotBook)) {
                    console.log(key, value)
                    count++
                    console.log(slotBook[key].slotId)
                }
                console.log(count)
                // deleteData(dateString, count,)
            }
            else {
                console.log("no data")
            }
        }
        catch (error) {
            console.log("e---------------------------------+")
        }



    }

    const deleteData = async (id, count) => {
        console.log(id, "asdfghjkl")
        // find total number of slots booked






    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Book Slot</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Select Slot</Text>
                    <View style={styles.action}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Select Slot" value="option1" />
                            {

                                slotTimes.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.slotStartTime + " - " + item.slotEndTime} value={item.slotId} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity

                            style={styles.signIn}
                            onPress={() => bookSlotForUser()}>
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Book Slot</Text>

                        </TouchableOpacity>
                        
                    </View>
                </View>
                            <Text style={styles.txt}> Slot :{slotStratTime} - {endTime}</Text>
            </View>


        </>
    )
}

export default BookSlot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,

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
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,

        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#009387'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
