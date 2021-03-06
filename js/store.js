import {
  createStore,
  applyMiddleware
} from 'redux';

const initialState = {
	markers: [],
	polygons: [],
	trajectory_input: [],
	odometry: {
		config: {
			
			
		}
	},
    motors: {
        enable: false,
        pwm: {
			left: 0,
			right: 0
		}
    },
	propulsion: {
		state: 0,
		error: 0,
		pose_error: {
			longitudinal: 0,
			lateral: 0,
			yaw: 0,
			speed: 0,
			yaw_rate: 0
		},
		target_pose: {position: {x: 0, y: 0}, yaw:0}
	},
	robots: {robot1: {pose: {position: {x: 0, y: 0}, yaw:0}, footprint: []}},
	input_target: [0,0,0],
	rosbridge: {
		connected: false
	}
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
	if (action.type === "ROSBRIDGE_SET_CONNECTED") {
    return Object.assign({}, state, {
      rosbridge: Object.assign({}, state.rosbridge, {connected: action.payload})
    });
  }  
  if (action.type === "MARKERS_UPDATE") {
    return Object.assign({}, state, {
      markers: action.payload
    });
  }
    if (action.type === "PROPULSION_SET_STATE") {
    return Object.assign({}, state, {
      propulsion: Object.assign({}, state.propulsion, {state: action.payload})
    });
  }
   if (action.type === "PROPULSION_SET_TARGET_POSE") {
    return Object.assign({}, state, {
      propulsion: Object.assign({}, state.propulsion, {target_pose: action.payload})
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
      motors: Object.assign({}, state.motors, {enable: action.payload})
    });
  }
  if (action.type === "MOTORS_SET_PWM") {
    return Object.assign({}, state, {
      motors: Object.assign({}, state.motors, {pwm: action.payload})
    });
  }

  return state;
}

const store = createStore(rootReducer, initialState);


export default store;