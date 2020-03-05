import store from './store.js';
import ROSLIB from "roslib";

const rosbridge_url = "ws://10.42.64.1:9090";


var ros = new ROSLIB.Ros();


ros.on('connection', function() {
  store.dispatch({type: "ROSBRIDGE_SET_CONNECTED", payload: true});
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
  ros.connect(rosbridge_url);
});


ros.connect(rosbridge_url);


// Odometry
var sub_odometry = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/odometry/robot_pose',
  messageType: 'goldo_msgs/RobotPose'
});

function updateRobotPose(message) {
  store.dispatch({
    type: 'UPDATE_ROBOT_POSE',
    payload: {
      robot_id: 'robot1',
      pose: Object.assign({}, message)
    }
  });
}

sub_odometry.subscribe(updateRobotPose);

// Markers
var sub_markers = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/markers',
  messageType: 'goldo_msgs/Markers'
});

function updateMarkers(message) {
  store.dispatch({
    type: 'MARKERS_UPDATE',
    payload: message.markers
  });
}

sub_markers.subscribe(updateMarkers);

// Motors enable
var sub_motors_enable = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/motors/enable',
  messageType: 'std_msgs/Bool'
});

function updateMotorsEnable(message) {
  store.dispatch({
    type: 'MOTORS_SET_ENABLE',
    payload: message.data
  });
}

sub_motors_enable.subscribe(updateMotorsEnable);

// Motors pwm right
var sub_motors_pwm = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/motors/pwm',
  messageType: 'goldo_msgs/MotorsPwm'
});

function updateMotorsPwm(message) {
  store.dispatch({
    type: 'MOTORS_SET_PWM',
    payload: Object.assign({}, message)
  });
}

sub_motors_pwm.subscribe(updateMotorsPwm);

// Propulsion state
var sub_propulsion_state = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/propulsion/state',
  messageType: 'std_msgs/UInt32'
});

function updatePropulsionState(message) {
  store.dispatch({
    type: 'PROPULSION_SET_STATE',
    payload: message.data
  });
}

sub_propulsion_state.subscribe(updatePropulsionState);

// Propulsion target pose
var sub_propulsion_target_pose = new ROSLIB.Topic({
  ros: ros,
  name: '/goldo/propulsion/target_pose',
  messageType: 'goldo_msgs/RobotPose'
});

function updatePropulsionTargetPose(message) {
  store.dispatch({
    type: 'PROPULSION_SET_TARGET_POSE',
    payload: Object.assign({}, message)
  });
}

sub_propulsion_target_pose.subscribe(updatePropulsionTargetPose);

function updateRobotFootprint(message) {
  store.dispatch({
    type: 'UPDATE_ROBOT_FOOTPRINT',
    payload: {
      robot_id: 'robot1',
      footprint: message
    }
  });
}

var param_robot_footprint = new ROSLIB.Param({
  ros: ros,
  name: '/goldo/robots/robot1/footprint'
});
param_robot_footprint.get(updateRobotFootprint);



export default ros;