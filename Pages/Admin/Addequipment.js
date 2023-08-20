import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { TextInput, Button, Appbar, Modal } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from "../../firebase";
import { setDoc, collection, doc, query, getDocs, where } from "firebase/firestore"
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
const Addequipment = () => {

    useEffect(() => {
        takeCategory()
    }, [])

    const [eqID, setEqId] = useState('')
    const [eqName, setEqName] = useState('')
    const [eqPrice, setEqPrice] = useState('')
    const [eqSupName, setSupName] = useState('')
    const [catName, setCatName] = useState('')

    const [cateModal, setCatModal] = useState(false)
    const [pCat, setPCat] = useState('')

    // date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fullDate, setFullDate] = useState("")
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

    const addProduct = () => {
        console.log('hello', eqID)
        if (eqID === '' || eqName === '' || eqPrice === '' || eqSupName === '' || fullDate === '') {
            alert("Please fill all fields")
        }
        else {
            // check if product already exists
            const q = query(collection(db, "equipment"), where("id", "==", eqID));
            const querySnapshot = getDocs(q);
            querySnapshot.then((res) => {
                console.log(res.size)
                if (res.size === 0) {
                    // add product
                    setDoc(doc(db, "equipment", eqID), {
                        id: eqID,
                        name: eqName,
                        // type: eqType,
                        price: eqPrice,
                        supplier: eqSupName,
                        date: fullDate,
                        category: catName
                    }).then(() => {
                        alert("Product added")
                        setEqId('')
                        setEqName('')
                        setEqPrice('')
                        setSupName('')
                        setFullDate('')
                        setCatName('')
                    })
                }
                else {
                    alert("Product already exists")
                }
            })
        }


    }


    const addCategory = async () => {
        console.log('hello', pCat)
        // check if category already exists
        const q = query(collection(db, "category"));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name, pCat);
            var cat = doc.data().name
            cat = cat.trim()
            var name = pCat
            // compare these two strings
            console.log(name, '--------')
            name = name.trim()
            console.log(cat, pCat)
            if (cat === name) {
                alert("Category already exists")
                setCatModal(false)
                setPCat('')
            }
            else {
                addData()
            }
        });
        if (querySnapshot.size === 0) {
            addData()
        }

        // add category
        // await setDoc(doc(db, "categories", pCat), {
        //     name: pCat,
        // });
        // alert("Category added")
        // setCatModal(false)
    }

    const addData = async () => {
        console.log("no data")
        await setDoc(doc(collection(db, "category")), {
            name: pCat,
        });
        alert("Category added")
        setCatModal(false)
        takeCategory()
    }

    const [categoryName, setCategoryName] = useState([])

    const takeCategory = async () => {
        setCategoryName([])
        const q = query(collection(db, "category"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);
            setCategoryName(categoryName => [...categoryName, doc.data().name])
        });
        console.log(categoryName)
    }




    return (
        <View>

            <ScrollView style={styles.Screenview}>
                <View style={styles.container}>
                    <View
                        flexDirection="row"
                        style={{
                            justifyContent: "space-between"
                        }}
                    >
                        <Text style={styles.text}>Add Equipment</Text>
                        <Feather name="plus" size={20} onPress={() => setCatModal(!cateModal)} />

                    </View>
                    <TextInput
                        label="Equipment id"
                        mode="outlined"
                        style={styles.input}
                        value={eqID}
                        onChangeText={text => setEqId(text)}
                        theme={{ colors: { primary: '#000000' } }}
                    />
                    <TextInput
                        label="Equipment Name"
                        mode="outlined"
                        style={styles.input}
                        theme={{ colors: { primary: '#000000' } }}
                        value={eqName}
                        onChangeText={text => setEqName(text)}
                    />

                    <TextInput
                        label="Equipment Price"
                        mode="outlined"
                        style={styles.input}
                        theme={{ colors: { primary: '#000000' } }}
                        value={eqPrice}
                        onChangeText={text => setEqPrice(text)}
                    />
                    <TextInput
                        label="Supplier Name"
                        mode="outlined"
                        style={styles.input}
                        theme={{ colors: { primary: '#000000' } }}
                        value={eqSupName}
                        onChangeText={text => setSupName(text)}
                    />

                    <Picker
                        selectedValue={catName}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setCatName(itemValue)}
                    >
                        <Picker.Item label="Select Category" value="" />
                        {categoryName.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>







                    <View
                        // row view
                        flexDirection='row'
                        style={{
                            width: 200,
                        }}
                    >
                        {/* date */}
                        <View style={styles.btndate}>
                            <Button
                                onPress={showDatepicker}
                                title={fullDate}
                                mode='contained'
                            >Purchace date</Button>
                        </View>

                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            top: 10

                        }}>Purchace {fullDate}</Text>
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

                    </View>
                    <Button
                        label='Add Equipment'
                        mode="contained"
                        onPress={() => addProduct()}
                    >Add Equipment</Button>
                </View>




                <Modal
                    visible={cateModal}
                    onDismiss={() => setCatModal(false)}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        margin: 20,
                        borderRadius: 10,
                        elevation: 5,
                    }}
                >
                    <TextInput
                        label="Category Name"
                        mode="outlined"
                        style={styles.input}
                        value={pCat}
                        onChangeText={text => setPCat(text)}
                        theme={{ colors: { primary: '#000000' } }}
                    />
                    <Button
                        icon="content-save"
                        mode="contained"
                        onPress={() => addCategory()}
                    >Add Category</Button>

                    <Button
                        icon="close"
                        mode="contained"
                        onPress={() => setCatModal(false)}
                        style={{
                            marginTop: 10,
                        }}

                    >Cancel</Button>

                </Modal>





            </ScrollView>
        </View>
    )
}
export default Addequipment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    btndate: {
        width: 150,
        height: 100,
        backgroundColor: 'transparent',
        // top: 20,
        // left: 100,
    },
    Screenview: {
        backgroundColor: '#f0f8ff',
        padding: 10,
    }

})