import { StyleSheet, View, FlatList } from "react-native";
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

  const onAddFavourite = () => {
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
    </View>
  );
};

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
