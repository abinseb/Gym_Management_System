import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";

import { auth, db } from "../../firebase";
import {
  getDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  collection,
} from "firebase/firestore";
import { async } from "@firebase/util";

const Paymentapprove = ({ navigation }) => {
  useEffect(() => {
    getPayment();
  }, []);
  var list = [];

  const [payment, setPayment] = useState([]);

  const getPayment = async () => {
    const q = query(collection(db, "Payment"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.data().Status === "pending") {
        getName(doc.id,doc.data().Sender, doc.data().PaymentId,doc.data().Date);
      }
    });
  };

  const getName = async (iid,id, paymentId,Date) => {
    const user = await getDoc(doc(db, "User", id));
    list.push({

      Paymentid: paymentId,
      Date: Date,
      Sender: id,
      userName: user.data().Name,
      id: iid,
    });
    setPayment(list);
    console.log(payment);
  };

  const approvePayment = async (id) => {
    console.log(id);
    const docRef = doc(db, "Payment", id);
    await updateDoc(docRef, {
      Status: "Approve",
    }).then(() => {
      alert("Approved");
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Payment</Text>
        <View style={styles.list}>
          <FlatList
            data={payment}
            renderItem={({ item }) => (
              <View style={styles.listItem} key={item.key}>
                <Text style={styles.listItemText}>
                  Payment Id: {item.Paymentid}
                </Text>
                <Text style={styles.listItemText}>Date: {item.Date}</Text>
                <Text style={styles.listItemText}>Sender: {item.Sender}</Text>
                <Text style={styles.listItemText}>Name: {item.userName}</Text>
                <View style={styles.btn}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      approvePayment(item.id);
                    }}
                  >
                    Approve
                  </Button>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Paymentapprove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    marginTop: 20,
  },
  listItemText: {
    fontSize:20,
    padding:2,
  },
})