import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AddContact, AddFavourite } from "../actions";
import Row from "./Row";

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

  const filteredData = () => { 
      return props.peoples.filter((people) => people.isContact === true)
  };

  const onAddContact = (id) => {
    props.AddContact(id);
  }

  const onAddFavourite = (id) => {
    props.AddFavourite(id);
    props.navigation.navigate("FAVOURITE");
  }

  const onItemPress = () => {
    console.log("onItemPress");
  }

  const renderItem = ({ item }) => {
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
      <FlatList data={filteredData()} renderItem={renderItem} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddContact: (index) => dispatch(AddContact(index)),
    AddFavourite:(id) => dispatch(AddFavourite(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
