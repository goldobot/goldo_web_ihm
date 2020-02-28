import store from './store.js';
import ROSLIB from "roslib";

var ros = new ROSLIB.Ros({ url: "ws://raspberrypi01/rosbridge" });

ros.on('connection', function() {
    console.log('Connected to websocket server.');
    });
    
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
export default ros;
