import {
  createStore,
  applyMiddleware
} from 'redux';

const initialState = {
	markers: [],
	trajectory_input: [],
    motors: {
        enabled: false,
        pwm_left: 0,
        pwm_right: 0
    }
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
  if (action.type === "TRAJECTORY_INPUT_SET_POINT") {
    return Object.assign({}, state, {
      trajectory_input: state.trajectory_input.map((content, i) => i === action.index ? action.payload : content)
    });
  }  
  if (action.type === "MOTORS_SET_ENABLE") {
    return Object.assign({}, state, {
      motors: Object.assign({}, state.motors, {enabled: action.payload})
    });
  }
  return state;
}

const store = createStore(rootReducer, initialState);


export default store;