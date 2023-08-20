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

const ViewMembers=({navigation})=>{
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
        showMember();

    },[])

    const showMember=async ()=>{
        const querySnapshot =await getDocs(collection(db,"User"),where("role","==","member"));
        var list=[]
        setMembers([])
        querySnapshot.forEach((doc)=>{
            if (doc.data().role=="member")
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
       
    
    const deleteMember=async(id)=>{
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
                    onRefresh={()=>{showMember()}}
                    />

            }
            horizontal={true}
            >
                
        </ScrollView>
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
                    <View style={styles.btn}>
                        <Button
                        mode="contained"
                        onPress={() => {
                            deleteMember(item.id);
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
        <View style={{
                Height:50
            }}>
        </View>
        
        </>
        
        
    )
}
export default ViewMembers;
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