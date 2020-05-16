import ros from './ros.js';
import ROSLIB from "roslib";


const ros_services = {
  set_motors_enable: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/motors/set_enable",
    serviceType: "goldo_msgs/SetBool"
  }),
  set_propulsion_enable: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/propulsion/set_enable",
    serviceType: "goldo_msgs/SetBool"
  }),
  motors_set_pwm: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/motors/set_pwm",
    serviceType: "goldo_msgs/SetMotorsPwm"
  }),
    propulsion_point_to: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/propulsion/point_to",
    serviceType: "goldo_msgs/PropulsionPointTo"
  }),
      propulsion_move_to: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/propulsion/move_to",
    serviceType: "goldo_msgs/PropulsionMoveTo"
  }),
        propulsion_execute_trajectory: new ROSLIB.Service({
    ros: ros,
    name: "/goldo/propulsion/execute_trajectory",
    serviceType: "goldo_msgs/PropulsionExecuteTrajectory"
  })  
};

export default ros_services;