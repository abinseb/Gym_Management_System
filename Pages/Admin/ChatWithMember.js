import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getDocs, doc, collection, query, getDoc } from "firebase/firestore";

const ChatWithMember = ({ navigation }) => {
    useEffect(() => {
        getMemeber()
    }, [])

    const [member, setMember] = useState([])

    const getMemeber = async () => {
        setMember([])
        var list = []
        const q = await getDocs(collection(db, "User"))
        q.forEach((doc) => {
            if (doc.data().trainerId == auth.currentUser.email) {
                console.log("he")
                list.push({
                    id: doc.id,
                    memberName: doc.data().Name
                })
            }
        })
        // console.log(list)
        setMember(list)
        console.log('---------------', member)


    }

    return (
        <>
            <FlatList
                data={member}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('UserChat', item)}>
                        <View
                            style={{
                                margin: 10,
                                padding: 20,
                                width: 200,
                                height: 70,
                                elevation: 5,
                                borderRadius: 5,
                                backgroundColor: '#fff'
                            }}
                        >
                            <Text>{item.memberName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    )

}
export default ChatWithMember