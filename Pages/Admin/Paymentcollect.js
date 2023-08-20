import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    Button,



} from "react-native"
import { Picker } from "@react-native-picker/picker";
// import { DateTimePicker } from "@react-native-community/datetimepicker";
import React, { useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"


const Paymentcollect = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('option1');
    const [id, setID] = useState("")
    const [userName, setUserName] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [place, setPlace] = useState("")
    const [contact, setContact] = useState("")
    const findUser = async () => {
        const docRef = doc(db, "User", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserName(docSnap.data().Name)
            setWeight(docSnap.data().Weight)
            setHeight(docSnap.data().Height)
            setPlace(docSnap.data().Place)
            setContact(docSnap.data().Contact)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    return (
        <View>
            <ScrollView>
                <View style={styles.Card}>
                    <View

                    >
                        <Text style={styles.Text}>
                            Gym ID
                        </Text>

                        <TextInput
                            style={styles.Input}
                            placeholder="Gym ID"
                            keyboardType='numeric'
                            maxLength={5}
                            onChangeText={(value) => setID(value)}
                        />
                    </View>
                    {/* Button */}
                    <View style={styles.btnfind}>
                        <Button
                            title="find"
                            onPress={findUser}
                        />
                    </View>
                    {/* user details */}
                    <View>
                        <Text style={styles.Display}>UserName = {userName} </Text>
                        <Text style={styles.Display}>Weight= {weight}</Text>
                        <Text style={styles.Display}>Height= {height}</Text>
                        <Text style={styles.Display}>Contact No= {contact}</Text>
                        <Text style={styles.Display}>Place= {place}</Text>

                    </View>

                    {/* user details */}

                    {/* Dropdown */}
                    <View>
                        <Text style={styles.Text}>Amount:</Text>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)
                            }
                        >
                            <Picker.Item label="Select amount" value="option" />
                            <Picker.Item label="500" value="500" />
                            <Picker.Item label="1500" value="1500" />
                            <Picker.Item label="2000" value="2000" />
                        </Picker>
                        <Text style={styles.Text}>Amount: {selectedValue}</Text>
                    </View>


                    <View style={styles.btn}>
                        <Button title="Collect"
                        // onPress={addUser} 
                        />

                    </View>

                </View>




            </ScrollView>

        </View>

    )

}
export default Paymentcollect

const styles = StyleSheet.create({

    Input: {
        margin: 30,
        borderWidth: 1,
        height: 40,
        width: 250,
        top: 30,
        borderRadius: 5,
        borderColor: '#1e90ff',
        marginTop: -5,
        paddingLeft: 10,
        left: -30
    },
    btndate: {
        width: 70,
        height: 35,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,

    },
    btn:
    {
        width: 100,
        height: 50,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
    },
    Card: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 30,
    },
    Text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        top: 10
    },
    Display: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "left",

    },
    btnfind: {
        width: 100,
        height: 50,
        backgroundColor: 'transparent',
        top: 10,
        left: -10,
        Button: 20,
        margin: 10

    }

})
