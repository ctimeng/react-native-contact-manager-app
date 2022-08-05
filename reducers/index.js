import {
  ADD_ALL_PEOPLE,
  ADD_CONTACT,
  ADD_FAVOURITE,
} from "../actions";

import { getFindIndexById } from "../global";

const initialState = {
  peoples: [],
  cities: []
};

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
      people.isContact = !people.isContact
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
      people.isFavourite = !people.isFavourite
      if (people.hasOwnProperty('refId') && people.refId !== '') {
        updateFirebase(people.refId, { isFavourite : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    default:
      return state;
  }
}
