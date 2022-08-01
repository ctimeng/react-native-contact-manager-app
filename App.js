import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/Home";
import ContactScreen from "./components/Contact";
import FavouriteScreen from "./components/Favourite";
import PeopleScreen from "./components/People";
import CompanyScreen from "./components/Company";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faAddressBook,
  faHeart,
  faUser,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import data from "./data.json";
import { AddAllPeople } from "./actions";
import { createStackNavigator } from "@react-navigation/stack";
import Create from "./components/Create";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faHome} />,
        }}
      />
      <Drawer.Screen
        name="CONTACT"
        component={ContactScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faAddressBook} />,
        }}
      />
      <Drawer.Screen
        name="FAVOURITE"
        component={FavouriteScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faHeart} />,
        }}
      />
      <Drawer.Screen
        name="POEPLE"
        component={PeopleScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faUser} />,
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="COMMPANY"
        component={CompanyScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faShoppingBag} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const App = (props) => {
  useEffect(() => {
    props.AddAllPeople(data.people);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Root"
          component={Root}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            title: "Create",
          }}
          name="Create"
          component={Create}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddAllPeople: (peoples) => dispatch(AddAllPeople(peoples)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
