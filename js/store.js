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
    },
	robots: {robot1: {pose: {position: {x: 0, y: 0}, yaw:0}, footprint: []}},
	input_target: [0,0]
};

const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
  
function robotReducer(state, action)
{
	if (action.type === "UPDATE_ROBOT_POSE") {
		return Object.assign({}, state, {pose: action.payload.pose});
	}
	if (action.type === "UPDATE_ROBOT_FOOTPRINT") {
		return Object.assign({}, state, {footprint: action.payload.footprint});
	}
}
  
function rootReducer(state = initialState, action) {
  if (action.type === "MARKERS_UPDATE") {
    return Object.assign({}, state, {
      markers: action.payload
    });
  }
 if (action.type === "UPDATE_ROBOT_POSE") {
    return Object.assign({}, state, {
      robots: objectMap(state.robots, (content, k, i) => k === action.payload.robot_id ? robotReducer(content, action) : content)
    });
  }
   if (action.type === "UPDATE_ROBOT_FOOTPRINT") {
    return Object.assign({}, state, {
      robots: objectMap(state.robots, (content, k, i) => k === action.payload.robot_id ? robotReducer(content, action) : content)
    });
  }
  if (action.type === "INPUT_TARGET_SET") {
    return Object.assign({}, state, {
      input_target: Object.assign({}, state.input_target, action.payload)
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