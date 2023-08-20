import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    StatusBar,
    Image,
    ImageBackground,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
// import { Icon } from 'react-native-elements'
// import { ScreenHeight } from 'react-native-elements/dist/helpers'
import {
    getFirestore,
    onSnapshot,
    doc,
    addDoc,
    getDoc,
    collection,
} from 'firebase/firestore'
import moment from 'moment'
import { Feather } from '@expo/vector-icons'
import { auth } from '../firebase'
import { Appbar } from 'react-native-paper'
const firestore = getFirestore()

const UserChat = ({ route, navigation }) => {
    const [msg, setMsg] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [DATA, setDATA] = useState([])
    const [uData, setUdata] = useState({ name: auth.currentUser.email })

    const sentMsg = async () => {
        try {
            if (msg != '') {
                console.log('name:', route.params.memberName);
                //console.lod("data.data().userName")
                console.log('senting...')
                setMsg('')
                await addDoc(collection(firestore, 'adminMessages'), {
                    name: uData.name,
                    message: msg,
                    chat: route.params.memberName,
                    dateTime: moment()
                        .utcOffset('+05:30')
                        .format('DD MMMM YYYY, h:mm:ss a'),
                })
                    .then(() => {
                        console.log('sent')
                        setIsFetching(true)
                        setIsFetching(false)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                alert('Message Empty')
            }
        } catch {
            ; (e) => {
                console.log(e.message)
            }
        }
        // console.log(moment().utcOffset('+05:30').format('DD MMMM YYYY, h:mm:ss a'));
        // let mmt = moment('29 April 2022, 3:51:10 am','DD MMMM YYYY, h:mm:ss a')
        // console.log(mmt.format('h:mm:ss a'));
    }

    useEffect(() => {
        console.log(route.params)
        const unsub = onSnapshot(collection(firestore, 'adminMessages'), (docs) => {
            docs.forEach((doc) => {
                let isFound = false
                isFound = DATA.some((element) => {
                    if (element.id == doc.id) {
                        // console.log("found");
                        return true
                    }
                    // console.log("not found");
                    return false
                })
                if (!isFound) {
                    if (doc.data().chat == route.params.memberName) {
                        let id = { id: doc.id }
                        DATA.push({ ...id, ...doc.data() })
                        // console.log(DATA)
                        DATA.sort((a, b) =>
                            moment(a.dateTime, 'DD MMMM YYYY, h:mm:ss a').isAfter(
                                b.dateTime,
                                'DD MMMM YYYY, h:mm:ss a',
                            )
                                ? 1
                                : -1,
                        )
                        setIsFetching(true)
                        setIsFetching(false)
                    }
                }
            })
        })
        console.log(DATA)
        return unsub
    }, [])

    const renderItem = ({ item }) => (
        // console.log('helloo', item.name),
        <View
            style={[
                styles.messages,
                item.name == uData.name ? { alignItems: 'flex-end' } : {},
            ]}
        >
            <View style={styles.message}>
                <Text>{item.message}</Text>
                <Text style={{ fontSize: 9, marginTop: 5, color: 'grey' }}>
                    {item.dateTime}
                </Text>
            </View>
        </View>
    )

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View
                style={{
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    top: 10,
                }}
            >
                <Image
                    style={styles.icn}
                // source={require('../../assets/images.jpeg')}
                />
                <Text style={styles.txt}>{route.params.memberName}</Text>
            </View>
            <ImageBackground
                resizeMode="cover"
                // source={require('../../assets/hosp.jpeg')}
                style={styles.imgBack}
            ></ImageBackground>
            <View style={styles.messageContainer}>
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        inverted
                        contentContainerStyle={{ flexDirection: 'column-reverse' }}
                    // onRefresh={setIsFetching(true)}
                    // refreshing={isFetching}
                    />
                </View>
            </View>
            <View style={styles.dum}></View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={msg}
                    onChangeText={(text) => {
                        setMsg(text)
                    }}
                    placeholder="Type here..."
                />
                {/* <Icon raised name="send" onPress={sentMsg} /> */}
                <Feather name='send' size={20} onPress={sentMsg} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        width: '80%',
        borderRadius: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    icn: {
        left: 20,
        height: 60,
        width: 60,
        borderRadius: 15,
    },
    txt: {
        left: 35,
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        // position: 'absolute',
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 25,
        marginVertical: 3,
        maxWidth: '90%',
        // flexDirection: 'row'
    },
    imgBack: {
        // height: ScreenHeight - 90,
        top: 90 + StatusBar.currentHeight,
        position: 'absolute',
        width: '100%',
    },
    messageContainer: {
        flex: 1,
        // backgroundColor: 'blue',
        flexDirection: 'column-reverse',
        marginTop: 10,
        paddingTop: 5,
        overflow: 'hidden',
    },
    dum: {
        height: 65,
        width: '100%',
        backgroundColor: 'transparent',
    },
    messages: {
        position: 'relative',
        // backgroundColor: 'yellow',
        paddingHorizontal: 12,
        width: '100%',
        alignItems: 'flex-start',
    },
})
