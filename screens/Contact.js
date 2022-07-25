import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { DeleteContact } from "../actions";
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

  const handleContact = () => {
    props.navigation.navigate("CONTACT");
  };

  const handleFavourite = () => {
    props.navigation.navigate("FAVOURITE");
  };

  const onItemPress = () => {
    console.log("onItemPress");
  }

  const renderItem = ({ item, index }) => {
    return (
      <Row
        people={item}
        handleContact={handleContact}
        handleFavourite={handleFavourite}
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
    DeleteContact: (index) => dispatch(DeleteContact(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
