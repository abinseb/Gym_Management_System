
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native';
import { Title } from "react-native-paper";
// image
import React, { useState } from 'react';
// firebase
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
var stDate;
var etDate;

const Event = ({ navigation }) => {

    const [title, settitle] = useState('');
    const [Description, setdescription] = useState('');
    const [venue, setvenue] = useState('');
    const [link, setlink] = useState('');
    // date
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [show1, setShow1] = useState(false);
    const [mode1, setMode1] = useState('date');



    // addEvent
    const addEvent = () => {
        if (startDate < endDate) {
            console.log("add")
            console.log(link)
            setDoc(doc(collection(db, "Event")), {
                Title: title,
                Description: Description,
                Venue: venue,
                Link: link,
                StartDate: startDate,
                EndDate: endDate,

            })
                .then(() => {
                    console.log("add");
                    alert("Event added");
                    settitle('');
                    setdescription('')
                    setvenue('');
                    setlink('');
                    setstartDate('');
                    setendDate('');
                })
                .catch((er) => {
                    console.log("error");
                    alert("error")
                });
        }
        else {
            alert("invalid input");
        }
    }




    // date

    const onChangeStartDate = (event, selectedDate) => {
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
        stDate = dateString;
        setstartDate(dateString);
        console.log(startDate)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>.", stDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        console.log(currentMode)
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    const onChangeEndDate = (event, selectedDate1) => {
        console.log(selectedDate1)
        // const currentDate = selectedDate;

        // setShow(false);
        // setDate(currentDate);
        // // console.log(currentDate);
        const year = selectedDate1.getFullYear();
        const month = selectedDate1.getMonth() + 1;
        const day = selectedDate1.getDate();
        setShow1(false);
        const dateString1 = `${day}-${month}-${year}`;
        if (event?.type === 'dismissed') {
            setDate1(date1);
            return;
        }
        setDate1(date1);
        etDate = dateString1;
        setendDate(dateString1);
        console.log("---------->", etDate)
        console.log(date1)
    }
    const showMode1 = (currentMode) => {
        setShow1(true);
        console.log(currentMode)
        setMode1(currentMode);
    };

    const showDatepicker1 = () => {
        showMode1('date');

    };


    // // date

    // imge
    // const [image, setImage] = useState(null);

    // const handleChoosePhoto = () => {
    //     const options = {
    //       noData: true,
    //     };
    //     ImagePicker.launchImageLibrary(options, response => {
    //       if (response.uri) {
    //         setImage(response);
    //       }
    //     });
    //   };



    return (
        <>
            <ScrollView style={styles.Screeview}>
                <View style={styles.Card}>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>New Event</Text>

                    <TextInput style={styles.Input}
                        placeholder="Title"
                        value={title}
                        onChangeText={(value) => settitle(value)}
                    />


                    {/* date */}
                    <View
                        style={{
                            flexDirection: "row",
                            elevation: 5,

                        }}
                    >
                        <View
                            style={styles.btnPicker}>
                            <Button
                                onPress={showDatepicker}
                                title="Start"
                                mode='contained'
                            >Set Date</Button>
                            <Text style={styles.Text2}>Start:{stDate}</Text>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    // is24Hour={true}
                                    onChange={onChangeStartDate}
                                    dateFormat="DD-MM-YYYY"
                                />


                            )}
                        </View>
                        {/* date */}
                        <View
                            style={styles.btnPicker}>


                            <Button
                                onPress={showDatepicker1}
                                title="End"
                                mode='contained'
                            >Set Date</Button>
                            <Text style={styles.Text1}>End:{etDate}</Text>
                            {show1 && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date1}
                                    mode={mode1}
                                    // is24Hour={true}
                                    onChange={onChangeEndDate}
                                    dateFormat="DD-MM-YYYY"
                                />
                            )}
                        </View>


                    </View>

                    <TextInput
                        placeholder="Description"
                        value={Description}
                        onChangeText={(value) => setdescription(value)}
                        style={styles.TextArea}
                    // multiline={true}

                    // onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                    <TextInput
                        placeholder="Venue"
                        style={styles.Input}
                        multiline={true}
                        value={venue}
                        onChangeText={(value) => setvenue(value)}
                    />

                    <TextInput
                        placeholder="Link"
                        style={styles.Input}
                        multiline={true}
                        editable={true}
                        onChangeText={(value) => setlink(value)}
                    />
                    {/* image */}
                    {/* <View>
                                {image && (
                                <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
                                )}
                                <TouchableOpacity onPress={handleChoosePhoto}>
                                <Text style={styles.Text}>Select Photo</Text>
                                </TouchableOpacity>
                            </View> */}

                    <View style={styles.btn}>
                        <Button title="Add"
                            onPress={addEvent}
                        />

                    </View>
                </View>





            </ScrollView>
        </>
    )
}
export default Event;

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
    TextArea: {
        margin: 30,
        borderWidth: 1,
        height: 80,
        width: 250,
        top: 30,
        borderRadius: 5,
        borderColor: '#1e90ff',
        marginTop: 30,
        paddingLeft: 10,

    },
    btn:
    {
        margin: 30,
        width: 100,
        height: 50,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
    },
    Text: {
        color: `blue`,
        left: 50,
        width: 200,
        top: 20,
        textDecorationLine: 'underline',


    },
    btnPicker: {
        margin: 30,
        width: 70,
        height: 40,
        backgroundColor: 'transparent',
        top: 20,
        // left: 100,
    },
    Card: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 30,
    },
    Text1: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        top: 20,
        left: 5



    },
    Text2: {

        fontSize: 15,
        fontWeight: 'bold',
        right: 20,
        top: 20

    },
    ScrollView: {
        marginBottom: 20,
    },
    Card: {
        marginBottom: 20,
    }


})