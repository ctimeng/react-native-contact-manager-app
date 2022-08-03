import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native"
import Row from "./Row"
import { useDispatch, useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"
import firebaseApp from "../Firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION_PEOPLES } from "../global";

const PeopleScreen = (props) => {

  const db = getFirestore(firebaseApp);

  const dispatch = useDispatch()
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
    //props.navigation.navigate("FAVOURITE");
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
    //props.navigation.navigate("FAVOURITE");
  };

  const onItemPress = (id) => {
    props.navigation.navigate('Edit', {itemId:id, otherParam:''});
  };

  const renderItem = ({ item, index }) => {
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
      <FlatList data={peoples} renderItem={renderItem} />
      <TouchableOpacity onPress={() => props.navigation.navigate('Create')} style={styles.fab}>
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
  }
});

export default PeopleScreen;
