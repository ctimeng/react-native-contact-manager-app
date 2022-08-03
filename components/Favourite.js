import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AddFavourite } from "../actions";
import Row from "./Row";
import firebaseApp from "../Firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"
import { FIREBASE_COLLECTION_PEOPLES } from "../global";

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

const FavouriteScreen = (props) => {

  const db = getFirestore(firebaseApp);
  const peoples = useSelector(getPeoples)

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
    return peoples.filter((people) => people.isFavourite === true);
  };

  const onAddFavourite = (id) => {
    const people =  peoples.filter(
      (people) => people.id === id
    )[0]
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
  }

  const onItemPress = (id) => {
    props.navigation.navigate('Edit', {itemId:id, otherParam:''});
  };

  const renderItem = ({ item }) => {
    return (
      <Row
        people={item}
        onAddFavourite={onAddFavourite}
        onItemPress={onItemPress}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={filteredData()} renderItem={renderItem} />
    </View>
  );
};

export default FavouriteScreen;
