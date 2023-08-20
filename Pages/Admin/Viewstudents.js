import React,{useState,useEffect} from "react";
import { 
    StyleSheet, 
    Text,
     View, 
     ScrollView,
      Image, 
      TouchableOpacity, 
      Alert,
       Modal,
       RefreshControl,
       FlatList
     } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {auth, db} from "../../firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import {Button, TextInput} from "react-native-paper";
import { async } from "@firebase/util";

const Viewstudents=({navigation})=>{
    // const memberId=[];
    // const memberName=[];
    // const memberEmail=[];
    // const memberPlace=[];
    // const memberHeight=[];
    // const memberWeight=[];
    const [Members,setMembers]=useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");


    useEffect(()=>{
        showMembers();

    },[])

    const showMembers=async ()=>{
        const querySnapshot =await getDocs(collection(db,"User"),where("role","==","member"));
        var list=[]
        setMembers([])
        querySnapshot.forEach((doc)=>{
            if (doc.data().trainerId==auth.currentUser.email)
            {
                list.push({
                    id:doc.id,
                    Name:doc.data().Name,
                    Email:doc.data().Email,
                    Place:doc.data().Place,
                    Height:doc.data().Height,
                    Weight:doc.data().Weight,
                    Role : doc.data().role,
                    key:doc.id,


                });
        }
        });
        console.log(list)
        setMembers(list);
        console.log(Members);
          
    };
       
    
    

    return(
        <>
       <View
       refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={()=>{showMembers()}}
                    />

            }
            horizontal={true}>
            

       </View>
        <View style={styles.container}>
            <Text style={styles.text}>Members</Text>
            <View style={styles.list}>
            <FlatList
                data={Members}
                renderItem={({ item }) => (
                <View style={styles.listItem} key={item.key}>
                
                    <Text style={styles.listItemText}>Name: {item.Name}</Text>
                    <Text style={styles.listItemText}>Email: {item.Email}</Text>
                    <Text style={styles.listItemText}>Place: {item.Place}</Text>
                    <Text style={styles.listItemText}>Height: {item.Height}</Text>
                    <Text style={styles.listItemText}>Weight: {item.Weight}</Text>
                    <Text style={styles.listItemText}>Role: {item.Role}</Text>
                    
                </View>
                )}
            />
            </View>
           

            

        </View>
        <View style={{
                Height:50
            }}>
        </View>
        
        </>
        
        
    )
}
export default Viewstudents;
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    
    text: {
        fontSize: 20,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    list: {
        marginTop: 20,
    },
    listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#f0f0f0",
        flexDirection: "column",
        borderRadius: 10,
    },
    listItemText: {
        fontSize: 18,
    },
    btn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    listItem:{
        marginBottom:10
    }

})