import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/Home';
import ContactScreen from './screens/Contact';
import FavouriteScreen from './screens/Favourite';
import PeopleScreen from './screens/People';
import CompanyScreen from './screens/Company';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faAddressBook, faHeart, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import data from "./data.json";
import { AddAllPeople } from "./actions";

const Drawer = createDrawerNavigator()

const App = (props) => {
  useEffect(() => {
    props.AddAllPeople(data.people);
  }, [])

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen} options={{
            drawerIcon: ({ focused }) =>
              <FontAwesomeIcon icon={faHome} />
          }} />
        <Drawer.Screen name="CONTACT" component={ContactScreen} options={{
          drawerIcon: ({ focused }) =>
            <FontAwesomeIcon icon={faAddressBook} />
        }} />
        <Drawer.Screen name="FAVOURITE" component={FavouriteScreen} options={{
          drawerIcon: ({ focused }) =>
            <FontAwesomeIcon icon={faHeart} />
        }} />
        <Drawer.Screen name="POEPLE" component={PeopleScreen} options={{
          drawerIcon: ({ focused }) =>
            <FontAwesomeIcon icon={faUser} />
        }} />
        <Drawer.Screen name="COMMPANY" component={CompanyScreen} options={{
          drawerIcon: ({ focused }) =>
            <FontAwesomeIcon icon={faShoppingBag} />
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddAllPeople: (peoples) => dispatch(AddAllPeople(peoples)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);