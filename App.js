import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


// Pages

import Login from './Pages/Login';
import User from './Pages/User';
import NavigationDrawer from './Pages/Admin/NavigationDrawer';
import Addtrainer from './Pages/Admin/Addtrainer';//add trainer
import AdminHome from './Pages/Admin/AdminHome';
import Event from './Pages/Admin/Event';
import Product from './Pages/Admin/Product';
import Paymentcollect from './Pages/Admin/Paymentcollect';
import Uploadvideo from './Pages/Admin/Uploadvideo';
import Slotcreation from './Pages/Admin/Slotcreation';
import ViewEvent from './Pages/Admin/ViewEvent';
import ViewProduct from './Pages/Admin/ViewProduct';
import ApproveUser from './Pages/Admin/ApproveUser';
import ViewBookedSlot from './Pages/Admin/ViewBookedSlot';
import ViewOrders from './Pages/Admin/ViewOrders';
import ViewEquipements from './Pages/Admin/ViewEquipements';
import Addamount from './Pages/Admin/Addamount';
import Paymentapprove from './Pages/Admin/Paymentapprove';
import ViewMemberandPayment from './Pages/Admin/ViewMemberandPayment';
import ViewMembers from './Pages/Admin/ViewMembers';
import Viewstudents from './Pages/Admin/Viewstudents';
import ViewAttendance from './Pages/Admin/ViewAttendance';


// common
import ApproveTrainerForMember from './Pages/Admin/ApproveTrainerForMember';
import ChatWithMember from './Pages/Admin/ChatWithMember';
import UserChat from './Pages/UserChat';
// import

// Member

import Navigation from './Pages/Member/Navigation';
import MemberReg from './Pages/Member/MemberReg';
import MemberHome from './Pages/Member/MemberHome';
import Feedback from './Pages/Member/Feedback';
import ViewTrainer from './Pages/Admin/ViewTrainer';
import RequestTrainer from './Pages/Member/RequestTrainer';
import BookSlot from './Pages/Member/BookSlot';
import ProductBooking from './Pages/Member/ProductBooking';
import Addequipment from './Pages/Admin/Addequipment';
import Viewevent from './Pages/Member/Viewevent';
import ChatWithTrainer from './Pages/Member/ChatWithTrainer';
import Profileupdate from './Pages/Member/Profileupdate';
import MemberPayment from './Pages/Member/MemberPayment';

// Trainer

import TrainerHome from './Pages/Trainer/Trainerhome';
import NavigationDrawerTrainer from './Pages/Trainer/NavigationDrawerTrainer';
import ViewslotMembers from './Pages/Trainer/ViewslotMember';
import Membersview from './Pages/Trainer/MembersView';





export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        ScreenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false, }}
        />
        <Stack.Screen name='User' component={User} />
        <Stack.Screen name='NavigationDrawer' component={NavigationDrawer} options={{ headerShown: false, }} />
        <Stack.Screen name="Addtrainer" component={Addtrainer} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name='Product' component={Product} />
        <Stack.Screen name='Paymentcollect' component={Paymentcollect} />
        <Stack.Screen name="Uploadvideo" component={Uploadvideo} />
        <Stack.Screen name="Slotcreation" component={Slotcreation} />
        <Stack.Screen name='ViewEvent' component={ViewEvent} options={{ headerShown: false }} />
        <Stack.Screen name='ViewProduct' component={ViewProduct} options={{ headerShown: false }} />
        <Stack.Screen name='ViewTrainer' component={ViewTrainer} />
        <Stack.Screen name='Approve User' component={ApproveUser} />
        <Stack.Screen name="Slot" component={ViewBookedSlot} />
        <Stack.Screen name="ViewOrders" component={ViewOrders} />
        <Stack.Screen name="View Equipements" component={ViewEquipements} />
        <Stack.Screen name="Addamount" component={Addamount}/>
        <Stack.Screen name="Paymentapprove" component={Paymentapprove}/>
        <Stack.Screen name="ViewMemberandPayment" component={ViewMemberandPayment}/>
        <Stack.Screen name="ViewMembers" component={ViewMembers}/>
        <Stack.Screen name="Viewstudents" component={Viewstudents}/>
        <Stack.Screen name="ViewAttendance" component={ViewAttendance}/>




        {/* commom */}


        <Stack.Screen name='ApproveTrainerForMember' component={ApproveTrainerForMember} />
        <Stack.Screen name='ChatWithMember' component={ChatWithMember} />
        <Stack.Screen name='UserChat' component={UserChat} options={{ headerShown: false }} />


        {/* Member */}
        <Stack.Screen name='Navigation' component={Navigation} options={{ headerShown: false, }} />
        <Stack.Screen name='MemberReg' component={MemberReg} />
        <Stack.Screen name='MemberHome' component={MemberHome} />
        <Stack.Screen name='Feedback' component={Feedback} />
        <Stack.Screen name='RequestTrainer' component={RequestTrainer} />
        <Stack.Screen name='BookSlot' component={BookSlot} />
        <Stack.Screen name='ProductBooking' component={ProductBooking} />
        <Stack.Screen name='Addequipment' component={Addequipment} />
        <Stack.Screen name='Viewevent' component={Viewevent} />
        <Stack.Screen name='ChatWithTrainer' component={ChatWithTrainer} />
        <Stack.Screen name='Profileupdate' component={Profileupdate} />
        <Stack.Screen name='MemberPayment' component={MemberPayment}/>


        {/* Trainer */}
        <Stack.Screen name='NavigationDrawerTrainer' component={NavigationDrawerTrainer} options={{headerShown: false}}/>
        <Stack.Screen name='TrainerHome' component={TrainerHome} />
        <Stack.Screen name='ViewslotMembers' component={ViewslotMembers}/>
        <Stack.Screen name='Membersview' component={Membersview}/>





      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
