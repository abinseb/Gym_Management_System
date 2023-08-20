import React,{useState} from "react";
import { TextInput,Button } from "react-native-paper";
import { Text,View,StyleSheet,ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { doc, getDoc, getDocs, setDoc, query, collection, deleteDoc,updateDoc} from 'firebase/firestore'
import {auth,db} from '../../firebase'




const Addamount=()=>{
    const[amt1,setamt1]=useState('');
    const[amt2,setamt2]=useState('');

    const Amount_with_trainer=()=>{
        updateDoc(doc(db,"trainerFee","withTrainer" ),{
            amount:amt1
        })
        .then(()=>{
            alert("Update Successfully");
            setamt1('');
            
        })
    };

    const Amount_without_trainer=()=>{
        updateDoc(doc(db,"trainerFee","withoutTrainer"),{
            amount:amt2
        })
        .then(()=>{
            alert("Update successfully")
            setamt2('');
        })
    };
    return(
        <>
        <ScrollView>
            <TextInput
                style={styles.Input}
                label="Amount With Trainer"
                mode='outlined'
                value={amt1}
                onChangeText={text=>setamt1(text)}
                theme={{ colors: { primary: '#000000' } }}
            />
            <View style={styles.btn}>
                <Button 
                    label="Update"
                    mode="contained"
                    onPress={()=>Amount_with_trainer()}>
                        Update
                    </Button>

            </View>
            <TextInput
                style={styles.Input}
                label="Amount Without Trainer"
                mode='outlined'
                value={amt2}
                onChangeText={text=>setamt2(text)}
                theme={{ colors: { primary: '#000000' } }}
                />
                <View style={styles.btn}>
                    <Button
                    label='Update'
                    mode="contained"
                    onPress={()=>Amount_without_trainer()}>
                        Update
                    </Button>

                </View>


        </ScrollView>
        
        </>
    )
}
export default Addamount

const styles=StyleSheet.create({
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
})
