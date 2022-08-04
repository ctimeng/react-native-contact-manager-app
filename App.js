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
import { AddAllPeople } from "./actions";
import { createStackNavigator } from "@react-navigation/stack";
import Create from "./components/Create";
import Edit from "./components/Edit";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  setLogLevel
} from "firebase/firestore";
import firebaseApp from "./Firebase";
import { FIREBASE_COLLECTION_PEOPLES } from "./global";
import { useDispatch } from "react-redux"
import { enableFreeze } from 'react-native-screens';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

enableFreeze(true);
setLogLevel('debug');

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faHome} />
        }}
      />
      <Drawer.Screen
        name="CONTACT"
        component={ContactScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faAddressBook} />
        }}
      />
      <Drawer.Screen
        name="FAVOURITE"
        component={FavouriteScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faHeart} />
        }}
      />
      <Drawer.Screen
        name="PEOPLE"
        component={PeopleScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faUser} />
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="COMPANY"
        component={CompanyScreen}
        options={{
          drawerIcon: ({ focused }) => <FontAwesomeIcon icon={faShoppingBag} />
        }}
      />
    </Drawer.Navigator>
  );
}

const App = () => {
  const db = getFirestore(firebaseApp);

  const dispatch = useDispatch()

  const initData = async () => {
    const q = query(
      collection(db, FIREBASE_COLLECTION_PEOPLES),
      orderBy("name")
    );
    onSnapshot(q, (querySnapshot) => {
      let peoples = [];
      querySnapshot.docs.forEach(function (doc) {
        let people = doc.data();
        people.id = doc.id;
        peoples.push(people);
      });
      dispatch(AddAllPeople(peoples))
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ 
            headerShown: false
           }}
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
        <Stack.Screen
          options={{
            title: "Edit",
          }}
          name="Edit"
          component={Edit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
