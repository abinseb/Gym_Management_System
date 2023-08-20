import React, { useState } from "react";
import {
    View,
    Text,
    Button, StyleSheet,
    ImageBackground,
    ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";




const MemberHome = ({ navigation }) => {

    return (

        <ScrollView>
            {/* Profile update */}
            <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('Profileupdate') }}>
                <ImageBackground
                     source={require('../..//assets/Fitness.jpeg')}
                    style={styles.imageDesign}>
                    <View
                        style={styles.overlayDesign}>
                        <Text
                            style={styles.HeadingtextDesign}>
                            Profile
                        </Text>
                        <Text
                            style={styles.subHeadingtextDesign}>
                            Update the Profile
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity >

            {/* Chat */}
            <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('ChatWithTrainer') }}>
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
                            Chat with Trainer
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity >
            {/* View event  */}
            <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={() => { navigation.replace('Viewevent') }}>
                <ImageBackground
                    source={require('../..//assets/notification.png')}
                    style={styles.imageDesign}>
                    <View
                        style={styles.overlayDesign}>
                        <Text
                            style={styles.HeadingtextDesign}>
                            Notifications
                        </Text>
                        <Text
                            style={styles.subHeadingtextDesign}>
                            Event Notifications
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity >

        </ScrollView>

    )
}

export default MemberHome

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