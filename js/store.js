import {
  createStore,
  applyMiddleware
} from 'redux';

const initialState = {
	markers: [],
	trajectory_input: []
};

function rootReducer(state = initialState, action) {
  if (action.type === "UPDATE_MARKERS") {
    return Object.assign({}, state, {
      markers: action.payload
    });
  }
  if (action.type === "TRAJECTORY_INPUT_ADD_POINT") {
    return Object.assign({}, state, {
      trajectory_input: state.trajectory_input.concat([action.payload])
    });
  }
  if (action.type === "TRAJECTORY_INPUT_SET_POINT_X") {
    return Object.assign({}, state, {
      trajectory_input: state.trajectory_input.map((content, i) => i === action.index ? [action.payload, content[1]] : content)
    });
  }
  if (action.type === "TRAJECTORY_INPUT_SET_POINT_Y") {
    return Object.assign({}, state, {
      trajectory_input: state.trajectory_input.map((content, i) => i === action.index ? [content[0], action.payload] : content)
    });
  }
  return state;
}

const store = createStore(rootReducer, initialState);


export default store;