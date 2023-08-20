

import React, { useState } from "react";
import { RadioButtonGroupProps, RadioButton } from "react-native-paper";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native'

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUserWithEmailAndPassword, sendSignInLinkToEmail, setPersistence } from "firebase/auth";


const AddTrainer = () => {
    // const [checked, setChecked] = React.useState("first");
    const [checked, setChecked] = useState("first");
    const [name, setName] = useState("");
    const [mobno, setMobNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [place, setPlace] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    // date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fullDate, setFullDate] = useState("")



    const addTrainer = () => {
        console.log('kkkk')
        console.log(email + place + name + mobno + password + district + state + pin)
        setDoc(doc(db, "User", email), {
            Name: name,
            Email: email,
            Gender: checked,
            Place: place,
            District: district,
            State: state,
            Pin: pin,
            Password: password,
            MobNo: mobno,
            DOB: fullDate,
            role: "trainer",
            Status: "Approve"


        })
            .then(() => {
                console.log("addd");
                alert("added");
                signUpTrainer('');
                setChecked('')
                setName('')
                setMobNo('')
                setEmail('')
                setPassword('')
                setPlace('')
                setDistrict('')
                setState('')
                setPin('')
                setFullDate('')

            })
            .catch((er) => {
                console.log("error");
                alert("error");

            });
    }
    const signUpTrainer = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((trainercredential) => {
                alert("trainer added")
                console.log("added")
            })
            .catch((er) => {
                alert("Trainer added")
            });
    }

    // date
    const onChange = (event, selectedDate) => {
        console.log(selectedDate)
        // const currentDate = selectedDate;

        // setShow(false);
        // setDate(currentDate);
        // // console.log(currentDate);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        setShow(false);
        const dateString = `${day}-${month}-${year}`;
        if (event?.type === 'dismissed') {
            setDate(date);
            return;
        }
        setDate(date);
        setFullDate(dateString);
        console.log(fullDate)
        console.log(date)
    };

    const showMode = (currentMode) => {
        setShow(true);
        console.log(currentMode)
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };
    // date

    return (
        <View>

            <ScrollView style={styles.ScreenView}>
                <View style={styles.Card}>

                    <TextInput style={styles.Input}
                        placeholder="Name"
                        onChangeText={(value) => setName(value)}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 20,
                            marginLeft: 30,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#000",
                            }}
                        >
                            Female
                        </Text>
                        <RadioButton
                            value="first"
                            status={checked === "first" ? "checked" : "unchecked"}
                            onPress={() => setChecked("first")}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#000",
                                marginLeft: 20,
                            }}
                        >
                            Male
                        </Text>
                        <RadioButton
                            value="second"
                            status={checked === "second" ? "checked" : "unchecked"}
                            onPress={() => setChecked("second")}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#000",
                                marginLeft: 20,
                            }}
                        >
                            Other
                        </Text>
                        <RadioButton
                            value="second"
                            status={checked === "third" ? "checked" : "unchecked"}
                            onPress={() => setChecked("third")}
                        />
                    </View>
                    <TextInput
                        style={styles.Input}
                        placeholder="Mob Number"
                        keyboardType='numeric'
                        maxLength={10}
                        onChangeText={(value) => setMobNo(value)}

                    />
                    <TextInput style={styles.Input}
                        placeholder="Email ID"
                        onChangeText={(value) => setEmail(value)}>

                    </TextInput>
                    <TextInput style={styles.Input}
                        placeholder="Password"
                        onChangeText={(value) => setPassword(value)} />






                    <TextInput style={styles.Input}
                        placeholder="Place"
                        onChangeText={(value) => setPlace(value)}>
                    </TextInput>
                    <TextInput style={styles.Input}
                        placeholder="District"
                        onChangeText={(value) => setDistrict(value)}>

                    </TextInput>
                    <TextInput style={styles.Input}
                        placeholder="State"
                        onChangeText={(value) => setState(value)} >

                    </TextInput>
                    <TextInput
                        style={styles.Input}
                        placeholder="PIN"
                        keyboardType='numeric'
                        maxLength={6}
                        onChangeText={(value) => setPin(value)}

                    />
                    {/* date */}
                    <View style={styles.btndate}>
                        <Button
                            onPress={showDatepicker}
                            title="DOB"
                            mode='contained'
                        >Set Date</Button>
                    </View>

                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',

                    }}>DOB: {fullDate}</Text>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            // is24Hour={true}
                            onChange={onChange}
                            dateFormat="DD-MM-YYYY"
                        />
                    )}

                    <View style={styles.btn}>
                        <Button title="Add"
                            onPress={addTrainer} />
                    </View>
                    <View style={styles.space}>

                    </View>
                </View>


            </ScrollView>
        </View>
    )
}
export default AddTrainer
const styles = StyleSheet.create({
    Input: {
        margin: 30,
        borderWidth: 1,
        height: 40,
        width: 250,
        top: 30,
        borderRadius: 5,
        borderColor: '#1e90ff',
        marginTop: 10,
        paddingLeft: 10,
    },
    btn:
    {
        width: 100,
        height: 50,
        top: 20,
        left: 100,
    },
    btndate: {
        width: 80,
        height: 40,
        backgroundColor: 'transparent',
        top: 20,
        left: 50,
    },
    space: {
        height: 50,
    },
    Card: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 30,
    },
})

