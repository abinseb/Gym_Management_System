import { collection, doc, getDocs, query,where } from "firebase/firestore";
import React,{useState,useEffect} from "react";
import { Text,View,StyleSheet,ScrollView ,FlatList} from "react-native";
import { db } from "../../firebase";

const ViewMemberandPayment=()=>{

    useEffect(()=>{

        getUsers()

    },[])

    const [payedUser,setPayedUser]=useState([])
    const [unPayedUser,setUnPayesUser]=useState([])

    const getUsers = async () => {
        var unPayed = [];
        var payed = [];
        const userDocRef = query(collection(db, "User"));
        const userQuerySnapshot = await getDocs(userDocRef);
        for (const userDoc of userQuerySnapshot.docs) {
            // const payDocRef = query(collection(db, "Payment")).where("Sender", "==", userDoc.id);
            const payR = collection(db,"Payment")
            const payDocRef = query(payR,where("Sender", "==", userDoc.id))
            const payQuerySnapshot = await getDocs(payDocRef);
            if(userDoc.data().role=="member"){
            if (payQuerySnapshot.size > 0) {
                payed.push({
                userName: userDoc.data().Name,
                Email: userDoc.id,
                PaymentStatus: "Approved",
                });
            } else {
                unPayed.push({
                userName: userDoc.data().Name,
                Email: userDoc.id,
                PaymentStatus: "Pending",
                });
            }
        }
            }
            setPayedUser(payed);
            setUnPayesUser(unPayed);
            console.log("------------payed------------------");
            console.log(payedUser);
            console.log("-------------unpayed-----------------");
            console.log(unPayedUser);
        };

    return(
        <>
        <ScrollView>
            <View style={styles.Payed}>
                <FlatList
                    data={unPayedUser}
                    renderItem={({item})=>{
                        return(
                        <View stye={styles.Card}>
                            <Text style={styles.txt1}>Name:{item.userName}</Text>
                            <Text style={styles.txt2}>Email:{item.Email}</Text>
                            <Text style={styles.txt3}>Payment Status:{item.PaymentStatus}</Text>
                        </View>
                        )
                    }}
                    />

                
            </View>
            <View style={styles.Payed}>
                <FlatList
                    data={payedUser}
                    renderItem={({item})=>{
                        return(
                        <View stye={styles.Card}>
                            <Text style={styles.txt1}>Username:{item.userName}</Text>
                            <Text style={styles.txt2}>Email:{item.Email}</Text>
                            <Text style={{color:'green'}}>Payment Status:{item.PaymentStatus}</Text>
                        </View>
                        )
                    }}
                    />

                
            </View>
        </ScrollView>
        </>
    )
}

export default ViewMemberandPayment

const styles=StyleSheet.create({
    Payed:{
        margin:10,
        padding:10,
        borderRadius:10,
        elevation:5,
        backgroundColor:"#fff"
    },
    Card:{
        width:200,
        height:200,
        backgroundColor:"red",
        elevation:5,
        margin:10

    },
    txt1:{
        fontSize:20,
        fontWeight:'bold'
    },
    txt2:{
        fontSize:15,
        
    },
    txt3:{
        color:'red'
    }

})