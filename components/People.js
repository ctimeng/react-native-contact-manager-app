import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Row from "./Row";
import { useSelector } from "react-redux";
import { getPeoples } from "../reducers/selectors";
import db from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../global";
import React, { useState } from "react";
import { FloatingMenu } from "react-native-floating-action-menu";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Searchbar } from 'react-native-paper';

const PeopleScreen = ({ navigation }) => {
  const peoples = useSelector(getPeoples);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filteredData = searchPeoples(peoples, search, "");
  const items = [
    {
      label: "CREATE CONTACT",
      fa: faUserPlus,
    },
  ];

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
    updateFirebase(id, { isContact: !people.isContact }, 1);
  };

  const onAddFavourite = (id) => {
    const people = peoples.filter((people) => people.id === id)[0];
    updateFirebase(id, { isFavourite: !people.isFavourite }, 2);
  };

  const onItemPress = (id) => {
    navigation.navigate("Edit", { itemId: id, otherParam: "" });
  };

  const handleMenuToggle = (isMenuOpen) => setIsMenuOpen(isMenuOpen);

  const handleItemPress = (item, index) => navigation.navigate("Create");

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
      <Searchbar
      placeholder="Search"
      onChangeText={(query) => setSearch(query)}
      value={search}
    />
      {loading && <ActivityIndicator size="large" />}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        style={{ backgroundColor: "white" }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      <FloatingMenu
        items={items}
        isOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
        onItemPress={handleItemPress}
      />
    </SafeAreaView>
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
    display: "none",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  search: {
    margin: 10,
    height: 30,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default PeopleScreen;
