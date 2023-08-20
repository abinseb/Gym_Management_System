
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,


} from '@react-navigation/drawer';



import MemberHome from './MemberHome';
// import ViewTrainer from './ViewTrainer';
import Feedback from './Feedback';
import RequestTrainer from './RequestTrainer';
import BookSlot from './BookSlot';
import ProductBooking from './ProductBooking';
// import Viewevent from './Viewevent';
import Chat from './ChatWithTrainer';
// import Profileupdate from './Profileupdate';
import MemberPayment from './MemberPayment';



const Drawer = createDrawerNavigator();

const NavigationDrawer = ({ navigation }) => {
    return (

        <>
            <Drawer.Navigator>

                <Drawer.Screen name='Member Home' component={MemberHome} />
                {/* <Drawer.Screen name='Trainer' component={ViewTrainer} /> */}
                <Drawer.Screen name='Request Trainer' component={RequestTrainer} />
                <Drawer.Screen name='Book Slot' component={BookSlot} />
                <Drawer.Screen name='Product Booking' component={ProductBooking} />
                <Drawer.Screen name='Feedback' component={Feedback} />
                {/* <Drawer.Screen name='View Event' component={Viewevent} /> */}
                <Drawer.Screen name='Chat With Trainer' component={Chat} />
                {/* <Drawer.Screen name='Profileupdate' component={Profileupdate} /> */}
                <Drawer.Screen name='Payment' component={MemberPayment}/>
                {/* <Drawer.Screen Name="Logout" component={<Button onPress={{
                    // logout
                }}>Logout</Button>}/> */}
                



            </Drawer.Navigator>
        </>
    )
}

export default NavigationDrawer