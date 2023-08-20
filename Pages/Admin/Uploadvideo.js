import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { color } from "react-native-reanimated";



const Uploadvideo = () => {

    const [Title, setvideotitle] = useState("");
    const [Description, setdescription] = useState("");
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var totalDate = ("" + date + "-" + month + "-" + year);

    const addvideo = () => {
        console.log(Title + Description)
        console.log(totalDate)
        if (Title == '' && Description == '') {
            alert("Please enter all fields")
        }
        else {
            setDoc(doc(db, "Video", Title), {
                Title: Title,
                Description: Description,
                Date: totalDate,
            })
                .then(() => {
                    alert("added");
                })
        }

    }





    return (
        <>
            <View>
                <ScrollView>
                    <View style={styles.Card}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Upload Training videos
                        </Text>
                        <TextInput
                            style={styles.Input}
                            placeholder="Video Tittle"
                            onChangeText={(value) => setvideotitle(value)}

                        />

                        <TextInput
                            placeholder="Video Description"
                            // value={Description}
                            onChangeText={(value) => setdescription(value)}
                            style={styles.TextArea}
                            multiline={true}

                        // onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                        />



                        {/* video */}




                        <View style={styles.btn}>
                            <Button
                                title="Send"
                                onPress={addvideo}
                            />

                        </View>



                    </View>

                </ScrollView>
            </View>
        </>
    )
}


export default Uploadvideo

const styles = StyleSheet.create({

    Input: {
        borderWidth: 1,
        height: 40,
        width: 250,
        top: 30,
        borderRadius: 5,
        borderColor: '#1e90ff',
        marginTop: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    TextArea: {
        borderWidth: 1,
        height: 80,
        width: 250,
        marginTop: 20,
        borderRadius: 5,
        borderColor: '#1e90ff',
        paddingLeft: 10,

    },
    btn:
    {

        top: 20,
        backgroundColor: 'green',
        marginBottom: 20,
    },
    Card: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 30,
    }

})