import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native"
import Row from "./Row"
import { useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"
import firebaseApp from "../Firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../global";
import React, { useState } from "react";

const PeopleScreen = ({ navigation }) => {

  const db = getFirestore(firebaseApp);

  const peoples = useSelector(getPeoples)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const filteredData = searchPeoples(peoples, search, '')

  const updateFirebase = async (id, fields, loading) => {
    //setLoading(loading);
    //setSelectedId(id);
    const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, id);
    await updateDoc(noteRef, fields)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        //setLoading(0);
      });
  };

  const onAddContact = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    updateFirebase(id, { isContact: !people.isContact }, 1);
    //props.navigation.navigate("CONTACT");
  };

  const onAddFavourite = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
    //props.navigation.navigate("FAVOURITE");
  };

  const onItemPress = (id) => {
    navigation.navigate('Edit', {itemId:id, otherParam:''});
  };

  const renderItem = ({ item }) => {
    return (
      <Row
        people={item}
        onAddContact={onAddContact}
        onAddFavourite={onAddFavourite}
        onItemPress={onItemPress}
        isFavourite={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search" style={styles.input} onChangeText={setSearch}/>
      <FlatList data={filteredData} renderItem={renderItem} />
      <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding:10
  },
  input: {
    margin: 10,
    height: 30,
    borderColor: "#7a42f4",
    borderWidth: 1,
  }
});

export default PeopleScreen;
