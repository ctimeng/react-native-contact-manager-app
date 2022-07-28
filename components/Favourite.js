import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AddFavourite } from "../actions";
import Row from "./Row";

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

  const filteredData = () => {
    return props.peoples.filter((people) => people.isFavourite === true);
  };

  const onAddFavourite = (id) => {
    props.AddFavourite(id);
  }

  const renderItem = ({ item }) => {
    return (
      <Row
        people={item}
        onAddFavourite={onAddFavourite}
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
    AddFavourite:(id) => dispatch(AddFavourite(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);
