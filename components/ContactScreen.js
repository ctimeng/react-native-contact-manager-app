import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Row from "./customs/Row";
import db from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { getPeoples } from "../reducers/selectors";
import { FIREBASE_COLLECTION_PEOPLES } from "../global";
import { useState, useEffect } from "react";
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const ContactScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const peoples = useSelector(getPeoples);
  const filteredData = () => {
    return peoples.filter((people) => people.isContact === true);
  };

  const updateFirebase = async (id, fields) => {
    setLoading(true);
    const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, id);
    await updateDoc(noteRef, fields)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onAddContact = (id) => {
    const people = peoples.filter((people) => people.id === id)[0];
    updateFirebase(id, { isContact: !people.isContact });
  };

  const onAddFavourite = (id) => {
    const people = peoples.filter((people) => people.id === id)[0];
    updateFirebase(id, { isFavourite: !people.isFavourite });
  };

  const onItemPress = (id) => {
    console.log("onItemPress");
    navigation.navigate("Edit", { itemId: id, otherParam: "" });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="book" mode="contained" onPress={() => navigation.navigate("Create")} >
          Create
        </Button>
      ),
    });
  }, [navigation]);

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
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <FlatList data={filteredData()} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default ContactScreen;
