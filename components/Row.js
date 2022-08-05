import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { socialNetworkIcon } from "./SocialNetworkIcon";

const Row = ({
  people,
  onAddContact,
  onAddFavourite,
  onItemPress,
  isFavourite = false,
}) => {
  return (
    <TouchableOpacity onPress={() => onItemPress(`${people.id}`)}>
      <View style={styles.container}>
        <View style={{ flexBasis: 100, paddingBottom:5, paddingTop:5 }}>
          <Image
            source={{ uri: people.avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100/ 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22
            }}
          />
        </View>
        <View style={{ flexBasis: "auto" }}>
          <Text>{people.name}</Text>
          <Text>{people.city}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {Object.keys(people.social_networks).sort().map((key) =>
              socialNetworkIcon(key)
            )}
          </View>
        </View>
        <View style={{ flexBasis: 200, justifyContent: "space-between" }}>
          {isFavourite ? (
            <Button
              onPress={() => onAddContact(`${people.id}`)}
              title={
                people.isContact === true
                  ? "DELETE FROM CONTACTS"
                  : "ADD TO CONTACTS"
              }
              style={styles.button}
              color={people.isContact === true ? "red" : "rgb(33, 150, 243)"}
            />
          ) : (
            <p></p>
          )}
          <Button
            onPress={() => onAddFavourite(`${people.id}`)}
            title={
              people.isFavourite === true
                ? "DELETE FROM FAVOURITE"
                : "ADD TO FAVOURITE"
            }
            style={styles.button}
            color={people.isFavourite === true ? "red" : "rgb(33, 150, 243)"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor:"#d9d9d9",
    marginTop:2,
    marginBottom:2,
    padding:5
  },
  containButtons: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  button: {
    marginTop: 2,
  },
});

export default Row;
