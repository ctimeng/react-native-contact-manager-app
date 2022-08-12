import * as React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { socialNetworkIcon } from "./SocialNetworkIcon";
import { Button, IconButton, MD3Colors } from 'react-native-paper';

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
       <View style={{ flex: 0.3, paddingBottom: 5, paddingTop: 5 }}>
            <Image
              source={{ uri: people.avatar }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
              }}
            />
        </View>
        <View style={{ flex:0.5, marginLeft:5, justifyContent: "space-between" }}>
            <Text>{people.name}</Text>
            <Text>{people.city}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", marginBottom:5, marginTop:5 }}
            >
              {Object.keys(people.social_networks)
                .sort()
                .map((key) => socialNetworkIcon(key))}
            </View>
        </View>

        <View style={{ flex: 0.2, flexDirection:"column", justifyContent: "space-between", alignItems: 'flex-end' }}>
          {isFavourite && (
            <IconButton
              icon="notebook"
              mode="contained-tonal"
              onPress={() => onAddContact(`${people.id}`)}
              color={people.isContact === true ? "red" : "rgb(33, 150, 243)"}
            />
          )}
          <IconButton
            icon="heart"
            onPress={() => onAddFavourite(`${people.id}`)}
            mode="contained"
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
    backgroundColor: "#d9d9d9",
    marginTop: 2,
    marginBottom: 2,
    padding: 5,
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
