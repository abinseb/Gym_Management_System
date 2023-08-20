import React,{useState,useEffect} from "react";
import { View,
     Text, 
     StyleSheet,
      Image,
       TouchableOpacity, 
       ScrollView, 
       TextInput, 
       Alert, 
       SafeAreaView,
       RefreshControl,
       Modal,
       FlatList } from "react-native";
import { Appbar, Title } from "react-native-paper";
import { db } from "../../firebase";
import { getDocs, doc, collection, query, deleteDoc, updateDoc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';

const ViewEquipments=({navigation})=>{
   

    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.navigate('NavigationDrawer')} />
                <Appbar.Content title="View Equipments" />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddEquipments')} />
            </Appbar.Header>
            <View
                style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingBottom: 20,
                }}

            >
            
               
            </View>

        </View>
        )
}
export default ViewEquipments

const styles=StyleSheet.create({

})
