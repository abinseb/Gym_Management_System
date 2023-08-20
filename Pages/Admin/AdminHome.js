
import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList
}
    from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import { Appbar } from 'react-native-paper'



const AdminHome = ({ navigation }) => {
    return (
        <View>
            <ScrollView>

                {/* <Appbar.Header> */}
                {/* <Appbar.BackAction onPress={() => navigation.navigate('HomeScreen')} /> */}
                {/* <Appbar.Content title="Home" />
                    <Appbar.Action icon="logout"
                        onPress={signOutHandle}
                    />
                    <Appbar.Action icon="car" onPress={() => { navigation.replace('AddDriver') }} /> */}
                {/* </Appbar.Header> */}
                {/* View Members with payment */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('ViewMemberandPayment') }}>
                    <ImageBackground

                        source={require('../..//assets/gymbody.jpg')}
                        style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                            <Text
                                style={styles.HeadingtextDesign}>
                                View Members
                            </Text>
                            <Text
                                style={styles.subHeadingtextDesign}>
                                View Members with Payment Status
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >
                {/* chat */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('ChatWithMember') }}>
                    <ImageBackground

                        source={require('../..//assets/chat.png')}
                        style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                            <Text
                                style={styles.HeadingtextDesign}>
                                Chat
                            </Text>
                            <Text
                                style={styles.subHeadingtextDesign}>
                                Chat with Members
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >
                {/* events */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('ViewEvent') }}>
                    <ImageBackground
                        source={require('../..//assets/event2.jpeg')}
                        style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                            <Text
                                style={styles.HeadingtextDesign}>
                                Events
                            </Text>
                            <Text
                                style={styles.subHeadingtextDesign}>
                                View all Events
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >
                {/* view product */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('ViewProduct') }}>
                    <ImageBackground

                        source={require('../..//assets/GymProduct1.jpeg')}
                        style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                            <Text
                                style={styles.HeadingtextDesign}>
                                Products
                            </Text>
                            <Text
                                style={styles.subHeadingtextDesign}>
                                View all Products
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >

                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('View Equipements') }}>
                    <ImageBackground

                        source={require('../..//assets/gymequipments1.jpeg')}
                        style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                            <Text
                                style={styles.HeadingtextDesign}>
                                Equipments
                            </Text>
                            <Text
                                style={styles.subHeadingtextDesign}>
                                View all Equipments
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >
                {/* View memberand payent */}
                
            </ScrollView>
        </View>
    )
}
export default AdminHome

const styles = StyleSheet.create({
    touchableDesign: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#000',
        padding: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 20,

        elevation: 5,
    },
    overlayDesign: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeadingtextDesign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    subHeadingtextDesign: {
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
    },
    imageDesign: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
})