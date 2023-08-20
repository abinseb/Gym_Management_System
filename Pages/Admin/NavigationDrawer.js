import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,


} from '@react-navigation/drawer';
import User from "../User";
import Addtrainer from "./Addtrainer";
import AdminHome from "./AdminHome";
import Product from "./Product";
// import Paymentcollect from "./Paymentcollect";
import Uploadvideo from "./Uploadvideo";
import Slotcreation from "./Slotcreation";
import ViewEvent from "./ViewEvent";
import ViewTrainer from "./ViewTrainer";
import ApproveUser from "./ApproveUser";
import ViewBookedSlot from "./ViewBookedSlot";
import ViewOrders from "./ViewOrders";
import Addequipment from './Addequipment';
import ApproveTrainerForMember from './ApproveTrainerForMember';
// import ChatWithMember from './ChatWithMember';
import Addamount from './Addamount';
import Paymentapprove from './Paymentapprove';
import ViewMembers from './ViewMembers';
import Viewstudents from './Viewstudents';
import ViewAttendance from './ViewAttendance';




function Adduse({ navigation }) {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

const Drawer = createDrawerNavigator();

const NavigationDrawer = ({ navigation }) => {
    return (
        <>
            <Drawer.Navigator>
                <Drawer.Screen name="AdminHome" component={AdminHome} />
                <Drawer.Screen name="Addtrainer" component={Addtrainer} />
                <Drawer.Screen name="Add Product" component={Product} />
                {/* <Drawer.Screen name="Paymentcollect" component={Paymentcollect} /> */}
                <Drawer.Screen name="Upload Video" component={Uploadvideo} />
                <Drawer.Screen name="Slot Creation" component={Slotcreation} />
                {/* <Drawer.Screen name="ViewEvent" component={ViewEvent} /> */}
                <Drawer.Screen name="ViewTrainer" component={ViewTrainer} />
                <Drawer.Screen name="Approve User" component={ApproveUser} />
                <Drawer.Screen name="Slot" component={ViewBookedSlot} />
                <Drawer.Screen name="View Orders" component={ViewOrders} />
                <Drawer.Screen name='Add Equipments' component={Addequipment} />
                <Drawer.Screen name='Approve Trainer Request' component={ApproveTrainerForMember} />
                <Drawer.Screen name="Addamount" component={Addamount}/>
                <Drawer.Screen name="Approve Payment" component={Paymentapprove}/>
                <Drawer.Screen name="ViewMembers" component={ViewMembers}/>
                <Drawer.Screen name="Viewstudents" component={Viewstudents}/>
                <Drawer.Screen name="ViewAttendance" component={ViewAttendance}/>
                


            </Drawer.Navigator>
        </>
    )
}

export default NavigationDrawer