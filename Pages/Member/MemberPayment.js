import React,{useState} from "react";
import {View,Text,ScrollView,StyleSheet} from 'react-native';

import { Button,TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, setDoc,query,getDocs,doc} from "firebase/firestore";
import {auth,db} from "../../firebase";

const MemberPayment=()=>{

    const[pid,setPid]= useState('')

    // date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fullDate, setFullDate] = useState("")
    // date

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
    const Payment=()=>{
        console.log('helo')
        if(pid==''||fullDate==''){
            alert("Please fill all fields")
        }

        else{
            setDoc(doc(collection(db,"Payment")),{
                PaymentId:pid,
                Date:fullDate,
                Status:"pending",
                Sender:auth.currentUser.email,

            })
            .then(()=>{
                console.log('send');
                alert("Send Payment Id successfully");
                setPid('');
                setFullDate('');
                
            })
        }
    }


    return(
        <View>
            <ScrollView>
                <TextInput style={styles.Input}
                label="Payment Id"
                mode='outlined'
                value={pid}
                onChangeText={text=>setPid(text)}
                theme={{ colors: { primary: '#000000' } }}

                />

                {/* date */}
                <View
                        // row view
                        flexDirection='row'
                        style={{
                            width: 200,
                            marginTop:30,
                        }}
                    >

                <View style={styles.btndate}>
                            <Button
                                onPress={showDatepicker}
                                title={fullDate}
                                mode='contained'
                            >Payment date</Button>
                        </View>

                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            top: 10

                        }}>Payment Date: {fullDate}</Text>
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
                <View style={styles.Btn}>
                    <Button
                        label='Send'
                        mode="contained"
                        onPress={()=>Payment()}
                        >Send</Button>
                </View>
                   
                
                
            </ScrollView>
        </View>
    )
}

export default MemberPayment

const styles=StyleSheet.create({
    Input: {
        marginBottom: 10,
        marginTop:20
    },
    Btn:{
        margin:20,


    }

})