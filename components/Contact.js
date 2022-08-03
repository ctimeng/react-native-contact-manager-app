import { FlatList, View, StyleSheet } from "react-native";
import Row from "./Row";
import firebaseApp from "../Firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"
import { FIREBASE_COLLECTION_PEOPLES } from "../global";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const ContactScreen = (props) => {

  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(0);
  const peoples = useSelector(getPeoples)

  const db = getFirestore(firebaseApp);

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

  const filteredData = () => { 
      return peoples.filter((people) => people.isContact === true)
  };

  const onAddContact = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    updateFirebase(id, { isContact: !people.isContact }, 1);
  }

  const onAddFavourite = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    //props.navigation.navigate("FAVOURITE");
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
  }

  const onItemPress = (id) => {
    console.log("onItemPress");
    props.navigation.navigate('Edit', {itemId:id, otherParam:''});
  }

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
      <FlatList data={filteredData()} renderItem={renderItem} />
    </View>
  );
};

export default ContactScreen;
