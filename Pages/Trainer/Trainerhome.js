import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Modal, ImageBackground } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Trainerhome = ({ navigation }) => {
    return (
        <>
            <ScrollView>
                {/* trainer chat */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={()=>{navigation.replace('ChatWithMember')}}>
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
                </TouchableOpacity>
                {/* approve member request for trainer */}
                <TouchableOpacity TouchableOpacity style={styles.touchableDesign} onPress={()=>{navigation.replace('ApproveTrainerForMember')}}>
                    <ImageBackground
                         source={require('../..//assets/Fitness.jpeg')}
                       style={styles.imageDesign}>
                        <View
                            style={styles.overlayDesign}>
                                <Text
                                    style={styles.HeadingtextDesign}>
                                        Approve Member Request
                                    </Text>
                                <Text 
                                    style={styles.subHeadingtextDesign}>
                                        Member Request for Trainer

                                </Text>
                            </View>
                    
                        
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
            


        </>
    )
}
export default Trainerhome;

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
