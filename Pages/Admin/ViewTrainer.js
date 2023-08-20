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

import {db} from "../../firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import {Button, TextInput} from "react-native-paper";
import { async } from "@firebase/util";

const ViewTrainer=({navigation})=>{
    // const memberId=[];
    // const memberName=[];
    // const memberEmail=[];
    // const memberPlace=[];
    // const memberHeight=[];
    // const memberWeight=[];
    const [Trainer,setTrainer]=useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");


    useEffect(()=>{
        showTrainer();

    },[])

    const showTrainer=async ()=>{
        const querySnapshot =await getDocs(collection(db,"User"),where("role","==","trainer"));
        var list=[]
        setTrainer([])
        querySnapshot.forEach((doc)=>{
            if (doc.data().role=="trainer")
            {
                list.push({
                    id:doc.id,
                    Name:doc.data().Name,
                    Email:doc.data().Email,
                    Place:doc.data().Place,
                    MobNo:doc.data().MobNo,
                    District:doc.data().District,

                    Role : doc.data().role,
                    key:doc.id,


                });
        }
        });
        console.log(list)
        setTrainer(list);
        console.log(Trainer);
          
    };
       
    
    const deleteTrainer=async(id)=>{
        console.log("id",id);
        Alert.alert(
           "Delete Member",
           "Are you sure you want to delete this product?",
           [
               {
                   text:"cancel",
                   onPress:()=>console.log("cancel pressed"),
                   style:"cancel"
               },
               {
                   text:"OK",onPress:async()=>{
                       try{
                           console.log("id",id);
                           deleteDoc(doc(db,"User",id))
                           .then(()=>{
                               alert("Deleted")
                           })
                       }
                       catch(e){
                           console.log("error");
                       }
                   }
               }
           ],
           {cancelable:false}
        );
   }

    return(
        <>
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={()=>{showTrainer()}}
                    />

            }
            horizontal={true}
            >
                
        </ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>Trainer</Text>
            <View style={styles.list}>
            <FlatList
                data={Trainer}
                renderItem={({ item }) => (
                <View style={styles.listItem} key={item.key}>
                
                    <Text style={styles.listItemText}>Name: {item.Name}</Text>
                    <Text style={styles.listItemText}>Email: {item.Email}</Text>
                    <Text style={styles.listItemText}>Place: {item.Place}</Text>
                    <Text style={styles.listItemText}>MobNo: {item.MobNo}</Text>
                    <Text style={styles.listItemText}>District: {item.District}</Text>
                    <Text style={styles.listItemText}>Role: {item.Role}</Text>
                    <View style={styles.btn}>
                        <Button
                        mode="contained"
                        onPress={() => {
                            deleteTrainer(item.id);
                        // console.log("approve clicked");
                        }}
                        >
                        Delete
                    </Button>
                    </View>
                </View>
                )}
            />
            </View>
        </View>
        
        </>
        
        
    )
}
export default ViewTrainer;
const styles=StyleSheet.create({
    
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