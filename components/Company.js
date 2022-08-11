import { useSelector } from "react-redux";
import { getPeoples } from "../reducers/selectors";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import * as React from 'react';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const CompanyScreen = () => {
  const peoples = useSelector(getPeoples);

  const companies = peoples
    .map((people) => people["company"])
    // store the keys of the unique objects
    .map((people, index, final) => final.indexOf(people) === index && index)
    // eliminate the dead keys & store unique objects
    .filter((people) => peoples[people])
    .map((people) => peoples[people]);

  const renderItem = ({ item }) => <Item title={item.company} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={companies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12
  },
});

export default CompanyScreen;
