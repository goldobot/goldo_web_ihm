import store from './store.js';
import ROSLIB from "roslib";

const rosbridge_url = "ws://10.42.64.1:9090";

var ros = new ROSLIB.Ros({ url: rosbridge_url});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
    });
    
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
	ros.connect(rosbridge_url);
  });
  
var listener = new ROSLIB.Topic({
     ros : ros,
     name : '/goldo/stm32/odometry',
    messageType : 'goldo_msgs/RobotPose'
});

function updateRobotPose(message)
{
	store.dispatch({type:'UPDATE_ROBOT_POSE', payload:{robot_id:'robot1', pose: Object.assign({}, message)}});
}

function updateRobotFootprint(message)
{
	store.dispatch({type:'UPDATE_ROBOT_FOOTPRINT', payload:{robot_id:'robot1', footprint: message}});
}

function updateMarkers(message)
{
	
  var markers = [];
  for (const [key, value] of Object.entries(message)) {
	markers.push({x: value.x * 0.001, y: value.y * 0.001, yaw: value.yaw*Math.M_PI/180, id: key});
	}
store.dispatch({type:'MARKERS_UPDATE', payload:markers});
}

var param_robot_footprint = new ROSLIB.Param({
  ros : ros,
  name : '/goldo/robots/robot1/footprint'
});
param_robot_footprint.get(updateRobotFootprint);

var param_markers = new ROSLIB.Param({
      ros : ros,
      name : '/goldo/markers'
    });
param_markers.get(updateMarkers);


listener.subscribe(updateRobotPose);

  
export default ros;
