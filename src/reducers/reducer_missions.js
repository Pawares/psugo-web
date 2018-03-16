import _ from 'lodash';
import {
  FETCH_MISSIONS,
  CREATE_MISSION,
  FETCH_MISSION,
  DELETE_MISSION,
  UPDATE_MISSION
} from '../actions/action_mission';


export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MISSIONS:
      return { ...state, [action.id]: action.payload };
    case CREATE_MISSION:
      return { ...state, [action.id]: action.payload };
    case FETCH_MISSION:
      return { ...state, [action.id]: action.payload };
    case DELETE_MISSION:
      return _.omit(state, [action.id]);
    case UPDATE_MISSION:
      return { ...state, [action.id]: action.payload };
    default:
      return state;
  }
}
