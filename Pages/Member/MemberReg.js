import React, { useState } from "react";
import { RadioButtonGroupProps, RadioButton } from "react-native-paper";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native'
const Membereg = () => {
    const [gymid, setgymid] = useState("");
    const [checked, setChecked] = useState("first");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [place, setPlace] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    // date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fullDate, setFullDate] = useState("")


    const addUser = ({ navigation }) => {
        console.log("hhhhh")
        console.log(email + place + name + weight + height + contact + password)
        setDoc(doc(db, "User", email), {
            GymId: gymid,
            Name: name,
            Email: email,
            Gender: checked,
            Place: place,
            DOB: fullDate,
            Weight: weight,
            Height: height,
            Contact: contact,
            Password: password,
            Status: "pending",
            role: "member",
            trainerId: "",

        })
            .then(() => {
                console.log("addddddddddddddddd");
                alert("Registered Successfully");
                // user registration 
                // signUpUser();
                setChecked('')
                setContact('')
                setEmail('')
                setWeight('')
                setHeight('')
                setPassword('')
                setgymid('')
                setName('')
                setPlace('')
                setFullDate('')


            })
            .catch((er) => {
                console.log("error");
                alert("error");
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
    //   date
    return (
        <View>

            <ScrollView style={styles.ScreenView}>
                <TextInput
                    style={styles.Input}
                    placeholder="Gym ID"
                    keyboardType='numeric'
                    maxLength={5}
                    value={gymid}
                    onChangeText={(value) => setgymid(value)}
                />
                <TextInput style={styles.Input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(value) => setName(value)} />
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
                        value="Female"
                        status={checked === "Female" ? "checked" : "unchecked"}
                        onPress={() => setChecked("Female")}
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
                        value="Male"
                        status={checked === "Male" ? "checked" : "unchecked"}
                        onPress={() => setChecked("Male")}
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
                        value="Other"
                        status={checked === "Other" ? "checked" : "unchecked"}
                        onPress={() => setChecked("Other")}
                    />
                </View>
                <TextInput
                    style={styles.Input}
                    placeholder="Current Weigth"
                    keyboardType='numeric'
                    maxLength={3}
                    value={weight}
                    onChangeText={(value) => setWeight(value)}
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Current Height"
                    keyboardType='numeric'
                    maxLength={3}
                    value={height}
                    onChangeText={(value) => setHeight(value)}
                />

                <TextInput
                    style={styles.Input}
                    placeholder="Contact No"
                    keyboardType='numeric'
                    maxLength={10}
                    value={contact}
                    onChangeText={(value) => setContact(value)}
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Email ID"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput
                    style={styles.Input}
                    placeholder="Place"
                    value={place}
                    onChangeText={(value) => setPlace(value)} />
                <TextInput
                    style={styles.Input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(value) => setPassword(value)} />



                {/* date */}
                <View style={styles.btndate}>
                    <Button
                        onPress={showDatepicker}
                        title="DOB"
                        mode='contained'
                    >Set Date</Button>
                </View>

                <Text>DOB: {fullDate}</Text>
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
                    <Button title="Register"
                        onPress={addUser} />

                </View>
                <View style={styles.space}>

                </View>



            </ScrollView>

        </View>
    )
}
export default Membereg
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
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
    },
    space: {
        height: 50,
    },
    btndate: {
        width: 70,
        height: 35,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,

    },

})

