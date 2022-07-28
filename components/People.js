import { StyleSheet, View, FlatList, TouchableOpacity, Text } from "react-native";
import Row from "./Row";
import { connect } from "react-redux";
import {
  AddContact,
  DeleteContact,
  AddFavourite,
  DeleteFavourite,
} from "../actions";

const PeopleScreen = (props) => {

  const onAddContact = (id) => {
    props.AddContact(id);
    props.navigation.navigate("CONTACT");
  }

  const onAddFavourite = (id) => {
    props.AddFavourite(id);
    props.navigation.navigate("FAVOURITE");
  }

  const onItemPress = () => {
    console.log("onItemPress");
  }

  const renderItem = ({ item, index }) => {
    return (
      <Row
        people={item}
        onAddContact={onAddContact}
        onAddFavourite={onAddFavourite}
        onItemPress={onItemPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.peoples}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 
  }, 
  fabIcon: { 
    fontSize: 40, 
    color: 'white' 
  }
});

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddContact: (id) => dispatch(AddContact(id)),
    DeleteContact: (id) => dispatch(DeleteContact(id)),
    AddFavourite: (id) => dispatch(AddFavourite(id)),
    DeleteFavourite: (id) => dispatch(DeleteFavourite(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleScreen);
