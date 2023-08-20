import React,{useState} from "react";
import { 
    createDrawerNavigator,
    DrawerContentScrollView, 
} from "@react-navigation/drawer";
import Trainerhome from "./Trainerhome";
import ViewslotMembers from "./ViewslotMember";
import Membersview from "./MembersView";




const Drawer = createDrawerNavigator();

const NavigationDrawerTrainer=({navigation})=>{
    return(
        <>
            <Drawer.Navigator>
                <Drawer.Screen name="Trainer Home" component={Trainerhome}/>
                <Drawer.Screen name="Slot" component={ViewslotMembers}/>
                <Drawer.Screen name="Members" component={Membersview}/>
                
            </Drawer.Navigator>
        </>
    )
}
export default NavigationDrawerTrainer