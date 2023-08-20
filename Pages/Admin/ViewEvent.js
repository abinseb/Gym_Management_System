import React, { useState, useEffect } from "react";
import {
    View,
    Text,

    StyleSheet,
    ScrollView,
    FlatList,
    Alert,
    RefreshControl,
    Modal
}
    from "react-native";
import { Appbar, Title } from "react-native-paper";
import { db } from "../../firebase";
import { getDocs, doc, collection, query, deleteDoc, updateDoc } from "firebase/firestore";
import { Button, TextInput, } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';


var EventID = ''
var stDate;
var etDate;
const ViewEvent = ({ navigation }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const [evnt, setev] = useState([])
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [description, setDescription] = useState("")
    const [venue, setVenue] = useState("")
    const [id, setId] = useState("")
    const [refreshing, setRefreshing] = useState(false);
    // const [EventID, setEventID] = useState("")


    useEffect(() => {
        setev([])
        showEvents()
        console.log("hello>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        // console.log(EventInfo)
    }, []);
    const showEvents = async () => {
        var EventInfo = [];
        setev([])
        const q = query(collection(db, "Event"))
        const qst = await getDocs(q)
        qst.forEach((doc) => {
            EventInfo.push({
                id: doc.id,
                title: doc.data().Title,
                startDate: doc.data().StartDate,
                endDate: doc.data().EndDate,
                Link: doc.data().Link,
                description: doc.data().Description,
                Venue: doc.data().Venue

            })
        })
        setev(EventInfo)
        console.log("-------------->", evnt)
    }
    const EventDelete = async (id) => {
        // const deleteU =async (id) =>{
        //     try
        //     {
        //       console.log(id)
        //       await deleteDoc(doc(db,"Slot",id))
        //       .then(()=>{
        //         alert("deleted")
        //       })
        //     }
        //     catch(error)
        //     {
        //       console.log("Error")
        //     }
        //   }
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this event?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        try {
                            console.log('----', id)
                            deleteDoc(doc(db, "Event", id))
                                .then(() => {
                                    alert("Deleted")
                                })

                        }
                        catch (error) {
                            console.log("Error")
                        }
                    }
                }
            ],
            { cancelable: false }
        );



    }
    const updateEvent = async () => {
        console.log(EventID)
        // navigation.navigate('UpdateEvent', { id: id })

        await updateDoc(doc(db, "Event", EventID), {
            Title: title,
            StartDate: startDate,
            EndDate: endDate,
            Link: link,
            Description: description,
            Venue: venue
        })
            .then(() => {
                alert("Updated")
                setTitle("")
                setStartDate("")
                setEndDate("")
                setLink("")
                setDescription("")
                setVenue("")
                setId("")

            })

    }
    const showForm = (item) => {
        EventID = item
        console.log('--=================-=-=-==-=-=-=-=-=-=-=-=-', item)
        setModalVisible(true)
        setShowUpdateForm(true)
    }

    const [modalVisible, setModalVisible] = useState(false);




    // datepicker

    // date
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [startDate, setstartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [show1, setShow1] = useState(false);
    const [mode1, setMode1] = useState('date');

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



    return (
        <View
            style={{
                // marginBottom: 200
            }}
        >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.navigate('NavigationDrawer')} />
                <Appbar.Content title="Events" />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('Event')} />
            </Appbar.Header>
            {/* <ScrollView>
            <View> */}

            {/* <FlatList
                        data={evnt}
                        renderItem={({item})=>(
                            <View>
                            <Text style={styles.Display1}>{item.title}</Text>
                            <Text style={styles.Display}>{item.startDate} to </Text>
                            <Text style={styles.Display}>{item.endDate}</Text>
                            <Text style={styles.Display}> {item.description}</Text>
                            <Text style={styles.Display}>{item.Venue}</Text>
                            <Text style={styles.Display}>{item.Link}</Text>
                            <View style={styles.btnupdate}>
                                <Button 
                                    title="Update"
                                    onPress={()=>[updateEvent(item.id),setShowUpdateForm(true)]}
                                />
                            </View>
                            <View style={styles.dlt}>
                                <Button title="Delete"
                                    onPress={()=> EventDelete(item.id)}
                                />
                                {
                                    showUpdateForm ?
                                    <View>
                                        
                                    </View>:null
                                }

                                

                            </View>
                            
                            </View>
                        )}
                    
                        /> */}
            <View
                style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingBottom: 20,
                }}

            >
                {
                    showUpdateForm ?
                        // form for update event
                        <View
                            style={{
                                // flexDirection: "row",
                                // justifyContent: "space-around",
                                // padding: 40,
                                // margin: 10,
                                // borderColor: "black",

                            }}
                        >
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    // Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}

                            >
                                <View
                                    style={{
                                        // flexDirection: "row",
                                        justifyContent: "space-around",
                                        top: 100,
                                        padding: 20,
                                        backgroundColor: "white",
                                        margin: 20,
                                        borderRadius: 10,
                                        borderColor: "black",
                                        borderWidth: 1,
                                        elevation: 10,
                                    }}
                                >
                                    <TextInput
                                        label={'Title'}
                                        mode={'outlined'}
                                        value={title}
                                        onChangeText={(text) => setTitle(text)}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            elevation: 5,
                                            margin: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                margin: 10,
                                            }}>
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
                                        <View
                                            style={{
                                                margin: 10,
                                            }}>


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
                                        label={'Description'}
                                        mode={'outlined'}
                                        value={description}
                                        onChangeText={(text) => setDescription(text)}
                                    />
                                    <TextInput
                                        label={'Venue'}
                                        mode={'outlined'}
                                        value={venue}
                                        onChangeText={(text) => setVenue(text)}
                                    />
                                    <TextInput
                                        label={'Link'}
                                        mode={'outlined'}
                                        value={link}
                                        onChangeText={(text) => setLink(text)}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Button
                                            style={styles.UpdateAndDelete}
                                            onPress={() => [updateEvent(id),
                                            setModalVisible(!modalVisible)]}
                                        >Update</Button>
                                        <Button style={styles.UpdateAndDelete} onPress={() => setShowUpdateForm(false)}>Cancel</Button>
                                    </View>

                                </View>
                            </Modal>
                        </View> : null
                }
                <FlatList
                    style={{
                        marginBottom: 200
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={showEvents}
                        />}
                    data={evnt}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Text
                                        // capitalize
                                        style={styles.title}
                                    >{item.title}</Text>
                                </View>
                                <Text style={styles.count}>{item.startDate} to {item.endDate}</Text>
                                <Text style={styles.count}>{item.description}</Text>
                                <Text style={styles.count}>{item.Venue}</Text>
                                <Text style={styles.count}>{item.Link}</Text>
                                {/*  buttons for update and delete */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        marginTop: 10,
                                    }}
                                >
                                    <Button style={styles.UpdateAndDelete} onPress={() => showForm(item.id)}>Update</Button>
                                    <Button style={styles.UpdateAndDelete} onPress={() => [EventDelete(item.id)]}
                                    >Delete</Button>
                                </View>

                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.title}
                />

            </View>











            {/* </View>
        </ScrollView> */}
        </View >
    )

}
export default ViewEvent
const styles = StyleSheet.create({
    Display1: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,

    },
    Display: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",

    },

    card: {
        width: 300,
        // height: 300,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        elevation: 5,
        // marginBottom: 20,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#000",
        fontWeight: 'bold',

    },
    count: {
        fontSize: 14,
        // alignSelf: 'center',
        // color: "#6666ff"
    },
    icon: {
        width: 30,
        height: 30,
    },
    UpdateAndDelete: {
        width: 100,
        backgroundColor: "#08b3fc",
        marginTop: 10,
    },
    cardHeader: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e7e8',
        paddingBottom: 5
    },
    title: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#000",
        fontWeight: 'bold',
        fontVariant: ['small-caps'],
        textTransform: 'uppercase',
        // fontStyle: ['italic'],
        // marginBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#e3e7e8',
        // paddingBottom: 5
    },







})
