import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux"
import { getPeoples } from "../reducers/selectors"

const HomeScreen = ({navigation}) => {
  const peoples = useSelector(getPeoples)

  const totalContact = () => {
    const contacts = peoples.filter(
      (people) => people.isContact === true
    );
    return contacts.length;
  };

  const totalFavourite = () => {
    const favourites = peoples.filter(
      (people) => people.isFavourite === true
    );
    return favourites.length;
  };

  const totalCompany = () => {
    const companies = peoples
      .map((people) => people["company"])
      // store the keys of the unique objects
      .map((people, index, final) => final.indexOf(people) === index && index)
      // eliminate the dead keys & store unique objects
      .filter((people) => peoples[people])
      .map((people) => peoples[people]);

    return companies.length;
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.item}
        underlayColor="#ccc"
        onPress={() => navigation.navigate("PEOPLE")}
      >
        <Text style={styles.text}> People: {peoples.length} </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.item}
        underlayColor="#ccc"
        onPress={() => navigation.navigate("CONTACT")}
      >
        <Text style={styles.text}> Contact: {totalContact()} </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.item}
        underlayColor="#ccc"
        onPress={() => navigation.navigate("FAVOURITE")}
      >
        <Text style={styles.text}> Favourite: {totalFavourite()} </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.item}
        underlayColor="#ccc"
        onPress={() => navigation.navigate("COMPANY")}
      >
        <Text style={styles.text}> Company: {totalCompany()} </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    backgroundColor: "rgb(33, 150, 243)",
    justifyContent: "center",
    alignItems: "center",
    margin:5,
    textAlign: "center"
  },
  text: {
    color: "white"
  }
});

export default HomeScreen;
