import { async } from "@firebase/util";
import React,{useState,useEffect} from "react";
import { View, ScrollView,Text, FlatList } from "react-native";
import { getDocs , collection , query,doc,getDoc,orderBy, loadBundle  } from "firebase/firestore";

import { auth,db } from "../../firebase";

const ViewAttendance =({navigation})=>{
    useEffect(()=>{
        getMemberAttendance()
    },[])
    const [attendanceList,setAttendanceList]=useState([])
    const userName =[]
    const Date = []
    var list =[]
    const getMemberAttendance=async()=>{
         list =[]
        setAttendanceList([])
        const qry = query(collection(db,"SlotBook"))
        const snap = await getDocs(qry)

        snap.forEach((doc)=>{

            // console.log(doc.id,doc.data())
            const slotData = doc.data()
            for(const [key,value] of Object.entries(slotData))
            {
                // console.log(slotData[key].slotId)
                getUserDetails(slotData[key].email,doc.id)
                
            }

        })
        
    }

    const getUserDetails =async(userID,date)=>{
        // var list =[]
        const userDoc = doc(db, "User", userID)
        var k =0
        const userDocSnap = await getDoc(userDoc)
        if (userDocSnap.exists()) {
            list.push({id:date,name:userDocSnap.data().Name})
            userName.push(userDocSnap.data().Name)
            Date.push(date)
            k=1
        }
        if(k==1)
        {
            insertToTable(userName,Date)
        }
        setAttendanceList(list)
        // console.log('-----',attendanceList)

    }
    const [groupedNames, setGroupedNames] = useState({});
    const insertToTable = (user,Date)=>{
        console.log(user,Date)
        const groups = {};
        for(let i=0;i<Date.length;i++)
        {
            const date = Date[i];
            const name = user[i];
            if (groups[date]) {
                groups[date].push(name);
            } else {
                groups[date] = [name];
            }
        }
        setGroupedNames(groups);
    }
    return(
        <>
            <View>
                {/* <FlatList
                    data={attendanceList}
                    renderItem={({item})=>(
                        <>
                            <Text style={
                                {
                                    fontSize:20,
                                    fontWeight:'800'
                                }
                            }>Date:{item.id}</Text>
                            <Text style={{
                                fontSize:16,

                            }}>name:{item.name}</Text>

                        </>
                    )}
                    /> */}

                    {Object.entries(groupedNames).map(([date, names]) => (
                            <View key={date}>
                            <Text style={{
                                fontSize:20,
                                fontWeight:'800',
                                marginTop:30,
                                left:10
                            }}>{date}</Text>
                            <View>
                                {names.map((name, index) => (
                                <Text style={{
                                    fontSize:15,
                                    fontWeight:'600',
                                    left:10
                                }} key={index}>{name}</Text>
                                ))}
                            </View>
                            </View>
                        ))}

            
            </View>
        </>
    )
}
export default ViewAttendance
