import {
  ADD_ALL_PEOPLE,
  ADD_CONTACT,
  DELETE_CONTACT,
  ADD_FAVOURITE,
  DELETE_FAVOURITE
} from "../actions";

import { FIREBASE_COLLECTION_PEOPLES, getFindIndexById } from "../global";
import firebaseApp from '../Firebase';
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const initialState = {
  peoples: [],
  cities: []
};

const db = getFirestore(firebaseApp);

const updateFirebase = async(id, fields) => {
  const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, id);
  await updateDoc(noteRef, fields);
}

export default function variable(state = initialState, action) {
  let index = 0
  let people = {}

  switch (action.type) {
    case ADD_ALL_PEOPLE:
      let peopleCities = [];
      action.payload.forEach(function (people, i) {
        if (!peopleCities.includes(people.city)) {
          peopleCities.push(people.city);
        }
      });

      return {
        ...state,
        peoples: action.payload,
        cities: peopleCities
      };
    case ADD_CONTACT:
      index = getFindIndexById(state.peoples, action.payload)
      people = state.peoples[index]
      people.isContact = true
      if (people.hasOwnProperty('refId') && people.refId !== '') {
        updateFirebase(people.refId, { isContact : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_CONTACT:
      index = getFindIndexById(state.peoples, action.payload)
      people = state.peoples[index]
      people.isContact = false
      if (people.hasOwnProperty('refId') && people.refId !== '') {
        updateFirebase(people.refId, { isContact : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case ADD_FAVOURITE:
      index = getFindIndexById(state.peoples, action.payload)
      people = state.peoples[index]
      people.isFavourite = true
      if (people.hasOwnProperty('refId') && people.refId !== '') {
        updateFirebase(people.refId, { isFavourite : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_FAVOURITE:
      index = getFindIndexById(state.peoples, action.payload)
      people = state.peoples[index]
      people.isFavourite = false
      if (people.hasOwnProperty('refId') && people.refId !== '') {
        updateFirebase(people.refId, { isFavourite : false })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    default:
      return state;
  }
}
