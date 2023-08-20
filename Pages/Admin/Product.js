import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
} from 'react-native'
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { setPersistence } from "firebase/auth";
import DateTimePicker from '@react-native-community/datetimepicker';
import { set } from "react-native-reanimated";

var stDate;
var etDate;






const Product = () => {

    const [productname, setproductname] = useState('');
    const [netweight, setnetweight] = useState('');
    const [Quantity, setquantity] = useState('');
    const [price, setprice] = useState('');
    const [show, setShow] = useState(false);
    const [batchnumber,setbatchnumber] = useState('');



    // date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [Mfgdate, setMfgdate] = useState("")


    const [date1, setDate1] = useState(new Date());
    const [show1, setShow1] = useState(false);
    const [mode1, setMode1] = useState('date');
    const [exprdate, setexprdate] = useState("")



    const onChangeMfg = (event, selectedDate) => {
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
        setMfgdate(dateString);
        console.log(Mfgdate)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>.", stDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        console.log(currentMode)
        console.log(show)
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };



    const onChangeExpr = (event, selectedDate1) => {
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
        setexprdate(dateString1);
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




    const addProduct = () => {
        console.log("added")
        setDoc(doc(collection(db, "Product")), {
            ProductName: productname,
            Netweight: netweight,
            Quantity: Quantity,
            Price: price,
            Mfgdate: Mfgdate,
            Exprdate: exprdate,
            BatchNumber:batchnumber,


        })
            .then(() => {
                console.log("added");
                alert("Product added")
                setproductname('');
                setnetweight('');
                setquantity('');
                setprice('');
                setMfgdate('');
                setexprdate('');
                stDate = '';
                etDate = '';
                setbatchnumber('')
            })
            .catch((er) => {
                console.log("error");
                alert("error")
            });
    }



    return (
        <View>
            <ScrollView style={styles.ScreenView}>
                <View style={styles.Card}>
                    <TextInput style={styles.Input}
                        label="Product Name"
                        value={productname}
                        mode="outlined"
                        onChangeText={(value) => setproductname(value)} />

                    {/* image */}

                    <TextInput style={styles.Input}
                        label="Net Weight"
                        keyboardType='numeric'
                        maxLength={4}
                        value={netweight}
                        mode="outlined"
                        onChangeText={(value) => setnetweight(value)} />



                    <TextInput style={styles.Input}
                        label="Quantity"
                        keyboardType='numeric'
                        maxLength={3}
                        value={Quantity}
                        mode="outlined"
                        onChangeText={(value) => setquantity(value)} />
                     <TextInput style={styles.Input}
                        label="Batch Number"
                        // keyboardType='numeric'
                        // maxLength={3}
                        value={batchnumber}
                        mode="outlined"
                        onChangeText={(value) => setbatchnumber(value)} />

                    {/* date */}



                    <View
                        style={{
                            flexDirection: "row",
                            elevation: 5
                        }}
                    >
                        <View
                            style={styles.btnPicker}>
                            <Button
                                onPress={showDatepicker}
                                title="Mfg"
                                mode='contained'
                            >Set Date</Button>
                            <Text style={styles.Text2}>Mfg Date :{stDate}</Text>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChangeMfg}
                                // dateFormat="DD-MM-YYYY"
                                />


                            )}
                        </View>
                        {/* date */}
                        <View
                            style={styles.btnPicker}>


                            <Button
                                onPress={showDatepicker1}
                                title="Expr"
                                mode='contained'
                            >Set Date</Button>
                            <Text style={styles.Text1}>Expr Date :{etDate}</Text>
                            {show1 && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date1}
                                    mode={mode1}
                                    // / is24Hour={true}
                                    onChange={onChangeExpr}
                                    dateFormat="DD-MM-YYYY"
                                />
                            )}
                        </View>


                    </View>
                    <TextInput
                        style={styles.Input}
                        label="Price"
                        mode="outlined"
                        keyboardType='numeric'
                        maxLength={4}
                        value={price}
                        onChangeText={(value) => setprice(value)}
                    />
                    <View style={styles.btn}>
                        <Button title="Add"
                            onPress={addProduct} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default Product

const styles = StyleSheet.create({
    Input: {
        margin: 30,
        borderWidth: 1,
        // height: 40,
        // width: 250,
        // top: 30,
        borderRadius: 5,
        // borderColor: '#1e90ff',
        // marginTop: 10,
        paddingLeft: 10,
    },
    btn:
    {
        width: 100,
        // height: 50,
        backgroundColor: 'transparent',
        // top: 20,
        left: 100,
    },
    Card: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        // padding: 30,
    },
    btnPicker: {
        margin: 30,
        width: 70,
        // height: 30,
        backgroundColor: 'transparent',
        top: 20,
        // left: 100,
    },



})
