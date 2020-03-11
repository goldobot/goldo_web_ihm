import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ROSLIB from "roslib";
import IconButton from '@material-ui/core/IconButton';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '@material-ui/core/Card';

import { connect } from "react-redux";

import PointListEditor from "./PointsListEditor.jsx";

import ros_services from './ros_services.js';




class PropulsionControlPanel extends React.Component {
	constructor(props) {
    super(props);
    this.state = {motors_enable: false, propulsion_enable: false,
	motors_pwm_left: 0, motors_pwm_right: 0};
	this.handleChangeMotorsEnable = this.handleChangeMotorsEnable.bind(this);
	this.handleChangePropulsionEnable = this.handleChangePropulsionEnable.bind(this);
	this.handleMotorsPwmLeft = this.handleMotorsPwmLeft.bind(this);
	this.handleMotorsPwmRight = this.handleMotorsPwmRight.bind(this);
	
	this.handlePointTo = this.handlePointTo.bind(this);
	this.handleMoveTo = this.handleMoveTo.bind(this);
	
	this.handleTargetXChanged = this.handleTargetXChanged.bind(this);
	this.handleTargetYChanged = this.handleTargetYChanged.bind(this);
    this.handleTargetYawChanged = this.handleTargetYawChanged.bind(this);
    this.handleExecuteTrajectory = this.handleExecuteTrajectory.bind(this);
  }
  
  componentDidMount() {
  }
  componentDidUpdate()
  {
	  	
  }
  
  handleChangeMotorsEnable(event)
  {
	var request = new ROSLIB.ServiceRequest({ value: event.target.checked });
ros_services.set_motors_enable.callService(request);	  
  }
  
   handleChangePropulsionEnable(event)
  {
	  var request = new ROSLIB.ServiceRequest({ value: event.target.checked });

    ros_services.set_propulsion_enable.callService(request);
	this.setState({propulsion_enable: event.target.checked});	  
  }
  
  handleMotorsPwmLeft(event, new_value)
  {
	  var request = new ROSLIB.ServiceRequest({data: { left: new_value * 0.01, right: this.props.motors.pwm_right}});
	  ros_services.motors_set_pwm.callService(request);  
  }
  
  handleMotorsPwmRight(event, new_value)
  {
      var request = new ROSLIB.ServiceRequest({data: { left: this.props.motors.pwm_left, right:  new_value * 0.01}});
	  ros_services.motors_set_pwm.callService(request);  
  }
  
  handleTargetXChanged(event)
  {
	  this.props.setInputTarget([event.target.value*0.001, this.props.input_target[1], this.props.input_target[2]]);
  }
  
   handleTargetYChanged(event)
  {
	  this.props.setInputTarget([this.props.input_target[0], event.target.value*0.001, this.props.input_target[2]]);
  }
  
  handleTargetYawChanged(event)
  {
	  this.props.setInputTarget([this.props.input_target[0], this.props.input_target[1], event.target.value * Math.PI/180]);
  }
  
  handlePointTo()
  {
	  var request = new ROSLIB.ServiceRequest({ target: {x: this.props.input_target[0] , y: this.props.input_target[1] }, yaw_rate: 1, angular_acceleration: 1, angular_decceleration: 1 });
      ros_services.propulsion_point_to.callService(request);
	  console.log('point to clicked');
  }
  
    handleMoveTo()
  {
	  var request = new ROSLIB.ServiceRequest({ target: {x: this.props.input_target[0] , y: this.props.input_target[1] }, speed: 1, acceleration: 1, decceleration: 1 });
      ros_services.propulsion_move_to.callService(request);
	  console.log('point to clicked');
  }
  
  handleExecuteTrajectory()
  {
      var request = new ROSLIB.ServiceRequest({trajectory: {points: this.props.input_trajectory.map(pt => { return {x: pt[0], y: pt[1]};})}, speed: 1, acceleration: 1, decceleration:1});
      ros_services.propulsion_execute_trajectory.callService(request);
	  console.log(this.props.input_trajectory);
  }
  
  render() {
    return(
	<React.Fragment>
      <FormControlLabel
            control={
              <Switch
                checked={this.props.motors.enable}
                onChange={this.handleChangeMotorsEnable}
              />
            }
            label="MotorsEnable"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.propulsion.state !== 0}
                onChange={this.handleChangePropulsionEnable}
              />
            }
            label="PropulsionEnable"
          />
		  <Typography id="input-motors-pwm-left" gutterBottom>
        Left PWM
		</Typography>
		  <Slider
            value={this.props.motors.pwm.left * 100}
			min={-100}
			max={100}
            onChange={this.handleMotorsPwmLeft}
            //aria-labelledby="input-slider"
          />
		    <Typography id="input-motors-pwm-right" gutterBottom>
        Right PWM
		</Typography>
		  <Slider
            value={this.props.motors.pwm.right * 100}
			min={-100}
			max={100}
            onChange={this.handleMotorsPwmRight}
            //aria-labelledby="input-slider"
          />
		  <Grid container spacing={1} alignItems="center">
		  <Grid item xs={4}>
		  <Button variant="contained" color="primary"  onClick={this.handlePointTo}>Point To</Button>
	  </Grid>
	  <Grid item xs={4}>
		  <Button variant="contained" color="primary"  onClick={this.handleMoveTo}>Move To</Button>
	  </Grid>
      <Grid item xs={4}>
		  <Button variant="contained" color="primary"  onClick={this.handleMoveTo}>Stop</Button>
	  </Grid>
	  <Grid item xs={8}>
		  <Button variant="contained" color="primary"  onClick={this.handleExecuteTrajectory}>Execute Trajectory</Button>
	  </Grid>
		  </Grid>	
		  
		  <Grid container spacing={1} alignItems="center">
		  <Grid item xs={4}>
		  <Input
		  value={this.props.input_target[0]*1000}
		  onChange={this.handleTargetXChanged}
		  inputProps={{
              step: 10,
              min: 0,
              max: 1500,
              type: 'number'             
            }}
		  />
		  </Grid>
		  <Grid item xs={4}>
		  <Input
          
		  value={this.props.input_target[1]*1000}
		  onChange={this.handleTargetYChanged}
		  inputProps={{
              step: 10,
              min: -1500,
              max: 1500,
              type: 'number'             
            }}
		  />
		  </Grid>
          <Grid item xs={4} >
		  <Input
         
		  value={this.props.input_target[2]*180/Math.PI}
		  onChange={this.handleTargetYawChanged}
		  inputProps={{
              step: 5,
              min: -180,
              max: 180,
              type: 'number'             
            }}
		  />
		  </Grid>
		  </Grid>		  
		  <PointListEditor/>
		  </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
	  input_target: state.input_target,
      input_trajectory: state.trajectory_input,
	  motors: state.motors,
	  propulsion: state.propulsion
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setInputTarget: point => dispatch({type: "INPUT_TARGET_SET", payload: point}),
  };
}

PropulsionControlPanel = connect(mapStateToProps, mapDispatchToProps)(PropulsionControlPanel);

export {PropulsionControlPanel as default};