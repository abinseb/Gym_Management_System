import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Image,
  Linking,
  ScrollView,
  SafeAreaView
} from 'react-native'
import { Button, Icon } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import { async } from '@firebase/util'
import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
const Login = ({ navigation }) => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const Handle = async () => {
    // navigation.navigate('NavigationDrawer')

    const k = doc(db, "User", email)

    const q = await getDoc(k)
    if (q.exists()) {
      switch (q.data().role) {
        case 'Admin':
          signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigation.navigate('NavigationDrawer')
              // ...
            }
            )
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            }
            )
          break;
        case 'member':
          signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigation.navigate('Navigation')
              // ...
            }
            )
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            }
            )
          break;
        case 'trainer':
          signInWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigation.navigate('NavigationDrawerTrainer')
              // ...
            }
            )
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            }
            )
          break;
        default:
          alert('Invalid User')
          break;

      }
    }





  }
  const HandleReg = () => {
    navigation.navigate('MemberReg')
  }
  const Handle1 = () => {
    navigation.navigate('Navigation')
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "white"
      }}
    >
      <Appbar style={{ backgroundColor: `#1e90ff`, minHeight: 100 }}>
        {/* image */}

      </Appbar>

      <Image
        style={{
          left: 140,
          height: 100,
          width: 100,
          top: 50,
          borderRadius: 50
          // minHeight:50
        }}
        source={require('../assets/Logo.jpeg')} />

      {/* Screen */}
      <View style={styles.container} >
        <View style={styles.card}>

          <View style={styles.form}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                letterSpacing: 1,
                left: 30,
                top: 30,
              }}
            >
              Username
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                letterSpacing: 1,
                left: 30,
                top: 50,
              }}
            >
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputP}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.btn}>
              <Button
                style={styles.button}
                onPress={Handle}

                title="Login"
              //color="green"
              />
            </View>
          </View>
          <View>
            <Text style={styles.signin}
              onPress={HandleReg}>
              Sign up?
            </Text>
            <Text
              onPress={Handle1}
              style={styles.flink}
            >Forgot Password?</Text>
          </View>
        </View>
      </View>
    </ScrollView>

  )
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  btn: {
    top: 70,
    width: 100,
    left: 100,
  },
  button: {
    width: 100,
  },
  txt: {
    color: 'white',
    top: 30,
    left: 20,
    fontSize: 27,
  },
  inputP: {
    top: 60,
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 250,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 8,
    left: 30,
    borderWidth: 1,
    borderColor: 'orange',
  },
  input: {
    color: 'black',
    top: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 250,
    height: 35,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 8,
    left: 30,
    borderWidth: 1,
    borderColor: 'orange',
  },
  card: {
    minHeight: 350,
    top: 60,
    width: 300,
    left: 30,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#ffff',
  },
  head: {
    backgroundColor: '#4e4e4e',
    height: 155,
    width: 400,
  },
  logSelection: {
    backgroundColor: '#4e4e4e',
    height: 70,
    width: 300,
    alignItems: 'center',
    paddingTop: 10,
    textAlign: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  flink: {
    color: `#87cefa`,
    left: 165,
    width: 200,
    top: 55,
    textDecorationLine: 'underline',
    bottom: 100,


  },
  signin: {
    bottom: 10,
    top: 70,
    left: 20,
    fontWeight: 'bold'
  }

})