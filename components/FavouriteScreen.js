import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import Row from "./customs/Row";
import db from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"
import { FIREBASE_COLLECTION_PEOPLES } from "../global";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FavouriteScreen = ({navigation}) => {

  const peoples = useSelector(getPeoples)
  const [loading, setLoading] = useState(false);

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

  const filteredData = () => {
    return peoples.filter((people) => people.isFavourite === true);
  };

  const onAddFavourite = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
  }

  const onItemPress = (id) => {
     navigation.navigate('Edit', {itemId:id, otherParam:''});
  };

  const renderItem = ({ item }) => {
    return (
      <Row
        people={item}
        onAddContact={null}
        onAddFavourite={onAddFavourite}
        onItemPress={onItemPress}
        isFavourite={true}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {
        loading && (<ActivityIndicator size="large" />)
      }
      <FlatList data={filteredData()} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default FavouriteScreen;
