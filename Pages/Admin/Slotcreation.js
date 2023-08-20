import React,{useState,useEffect} from "react";
import { View,
    Button,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList
 }
  from "react-native";
import {collection, doc,getDocs,setDoc,deleteDoc} from "firebase/firestore";
import {auth,db} from "../../firebase";


  import DateTimePickerModal from "react-native-modal-datetime-picker";
import { async } from "@firebase/util";
  var startTime;
  var endTime;
  let h1;
  let h2;
  const Slotcreation=(navigation)=>{

    // useEffect
    useEffect(()=>{
      slot()

    },[])



    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1,setDatePickerVisibility1]=useState(false);
    const [Capacity,setCapacity]=useState("");
    const [startTimeView,setStartTimeView] = useState(false)
    const [endTimeView,setEndTimeView] = useState(false)
    const [ slotStartTime , setSlotStartTime]=useState('')
    
    

    const createSlot=()=>{

     
    if(h1<h2 && Capacity!="")
    {
        console.log(startTime+endTime+Capacity)
        setDoc(doc(collection(db,"Slot")),{

          startTime:slotStartTime,
          endTime:endTime,
          Capacity:Capacity,

        })
        .then(()=>{
          alert("Created");
        })
     }
     else{
      console.log("-->",h1,"-->",h2,"--->",Capacity)

      alert("input vallid time slot");
     }

    }

   
    // start time
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
      setStartTimeView(true)
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      h1 = date.getHours();
      startTime = `${hours}:${minutes}`;
      setSlotStartTime(startTime)
      console.log(startTime)
      hideDatePicker();
    };
    // start time
    // end time
    const showDatePicker1=()=>{
      setDatePickerVisibility1(true);
      setEndTimeView(true)
    };

    const hideDatePicker1=()=>{
      setDatePickerVisibility1(false);
    };
    
    const handleConfirm1=(date)=>{
      let hours=date.getHours();
      h2 = date.getHours();
      let minutes=date.getMinutes();
      endTime=`${hours}:${minutes}`;

      console.log(endTime)
      hideDatePicker1();
    };
    


    // const list = []
    //     await getDocs(collection(db, "equipments"))
    //         .then((docs) => {
    //             docs.forEach((doc) => {
    //                 // compain eqCount and eqName and push to equipments
    //                 let val = doc.data().eqName + " - " + doc.data().eqCount
    //                 list.push({
    //                     key: doc.id,
    //                     value: val

    //                 })

    //             })
    //         })
    //     setEquipments(list)

    const [slotTimes,setSlotTime]=useState([])

    const slot=async ()=>{
      const list=[]
      await getDocs(collection(db,"Slot"))
      .then((docs) => {
        docs.forEach((doc)=>{
          list.push({id:doc.id,startTime:doc.data().startTime,endTime:doc.data().endTime,capacity:doc.data().Capacity})
        })
        setSlotTime(list)
        console.log(slotTimes)
      })
    }



    // delete slot
    const deleteU =async (id) =>{
      try
      {
        console.log(id)
        await deleteDoc(doc(db,"Slot",id))
        .then(()=>{
          alert("deleted")
        })
      }
      catch(error)
      {
        console.log("Error")
      }
    }
  
    

    return(<>
            
            <ScrollView>
                <View style={styles.btnTime}>
                <Button title="Start time" onPress={showDatePicker} />
                </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  <View style={styles.btnTime}>
                  <Button title="End time" onPress={showDatePicker1} />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible1}
                    mode="time"
                    onConfirm={handleConfirm1}
                    onCancel={hideDatePicker1}
                  />
                    <TextInput 
                        style={styles.Input}
                        placeholder="Capacity"
                        keyboardType = 'numeric'
                        maxLength={3}
                        onChangeText={(value)=>setCapacity(value)}
                    /> 
                    
                    <View style={styles.btn}>
                        <Button title="Create"
                        onPress={createSlot} 
                        />

                       
                     </View>
                     {
                      startTimeView && (
                        <Text style={styles.Txt1}>Start time = {startTime}</Text>
                      )
                     }
                     {
                      endTimeView && (
                        <Text style={styles.Txt2}>End time = {endTime}</Text>
                      )
                     }

                
          </ScrollView>

                    {/* slot view */}
                    <FlatList
                      data={slotTimes}
                      renderItem={({item})=>(
                        <View>
                          <Text style={styles.Display}>Start time = {item.startTime}</Text>
                          <Text style={styles.Display}>end time = {item.endTime}</Text>
                          <Text style={styles.Display}>Capacity = {item.capacity}</Text>
                          <View style={styles.btndlt}>
                          <Button title="Delete" onPress={()=> deleteU(item.id)}/>
                          </View>
                        </View>
                      )}
                      />
                
            </>

    )
  }
  export default Slotcreation

  const styles=StyleSheet.create({ btn:
    {
        width: 100,
        height: 50,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
    },
    Input: {
            margin: 30,
            borderWidth: 1,
            height: 40,
            width: 250,
            top: 30,
            borderRadius: 5,
            borderColor: '#1e90ff',
            marginTop: 10,
            paddingLeft: 10,
  },
      btnTime:{
        width: 250,
        height: 35,
        backgroundColor: 'transparent',
        top: 20,
        left: 40,
        bottom:10,
        marginBottom:40,

    },
    btn:
    {
        width: 100,
        height: 50,
        backgroundColor: 'transparent',
        top: 20,
        left: 100,
        
    },
    btndlt:
    {
        width: 70,
        height: 50,
        backgroundColor:'transparent',
        top: 20,
        left: 10,
        margin:10,
        bottom:5,
        top:2,
      
        
    },
    Display:{
      fontSize:16,
      fontWeight:"bold",
      textAlign:"left",
      left:15

},
Txt1:{

  fontSize:16,
  fontWeight:'bold',
  textAlign:'left',
  color:'green',
  left:40,
  bottom:220
},
Txt2:{

  fontSize:16,
  fontWeight:'bold',
  textAlign:'left',
  color:'green',
  left:40,
  bottom:160,
}

  })