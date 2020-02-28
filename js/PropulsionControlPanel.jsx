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
  }
  
  componentDidMount() {
  }
  componentDidUpdate()
  {
	  	var request = new ROSLIB.ServiceRequest({ left: this.state.motors_pwm_left * 0.01, right: this.state.motors_pwm_right * 0.01});
    window.ros_services.motors_set_pwm.callService(request);  
  }
  
  handleChangeMotorsEnable(event)
  {
	  var request = new ROSLIB.ServiceRequest({ value: event.target.checked });

    window.ros_services.set_motors_enable.callService(request);
	this.setState({motors_enable: event.target.checked});
	  
  }
  
   handleChangePropulsionEnable(event)
  {
	  var request = new ROSLIB.ServiceRequest({ value: event.target.checked });

    window.ros_services.set_propulsion_enable.callService(request);
	this.setState({propulsion_enable: event.target.checked});	  
  }
  
  handleMotorsPwmLeft(event, new_value)
  {
	this.setState({motors_pwm_left: new_value});
  }
  
  handleMotorsPwmRight(event, new_value)
  {
	this.setState({motors_pwm_right: new_value});
  }
  
  handleTargetXChanged(event)
  {
	  this.props.setInputTarget([event.target.value*0.001, this.props.input_target[1]]);
  }
  
   handleTargetYChanged(event)
  {
	  this.props.setInputTarget([this.props.input_target[0], event.target.value*0.001]);
  }
  
  handlePointTo()
  {
	  var request = new ROSLIB.ServiceRequest({ target: {x: this.props.input_target[0] , y: this.props.input_target[1] }, yaw_rate: 1, angular_acceleration: 1, angular_decceleration: 1 });
      window.ros_services.propulsion_point_to.callService(request);
	  console.log('point to clicked');
  }
  
    handleMoveTo()
  {
	  var request = new ROSLIB.ServiceRequest({ target: {x: this.props.input_target[0] , y: this.props.input_target[1] }, speed: 1, acceleration: 1, decceleration: 1 });
      window.ros_services.propulsion_move_to.callService(request);
	  console.log('point to clicked');
  }
  
  handleExecuteTrajectory()
  {
	  
  }
  
  render() {
    return(
	<React.Fragment>
      <FormControlLabel
            control={
              <Switch
                checked={this.state.motors_enable}
                onChange={this.handleChangeMotorsEnable}
              />
            }
            label="MotorsEnable"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.propulsion_enable}
                onChange={this.handleChangePropulsionEnable}
              />
            }
            label="PropulsionEnable"
          />
		  <Typography id="input-motors-pwm-left" gutterBottom>
        Left PWM
		</Typography>
		  <Slider
            value={this.state.motors_pwm_left}
			min={-100}
			max={100}
            onChange={this.handleMotorsPwmLeft}
            //aria-labelledby="input-slider"
          />
		    <Typography id="input-motors-pwm-right" gutterBottom>
        Right PWM
		</Typography>
		  <Slider
            value={this.state.motors_pwm_right}
			min={-100}
			max={100}
            onChange={this.handleMotorsPwmRight}
            //aria-labelledby="input-slider"
          />
		  <Grid container spacing={2} alignItems="center">
		  <Grid item>
		  <Button variant="contained" color="primary" xs={6} onClick={this.handlePointTo}>Point To</Button>
	  </Grid>
	  <Grid item>
		  <Button variant="contained" color="primary" xs={6} onClick={this.handleMoveTo}>Move To</Button>
	  </Grid>
	  <Grid item>
		  <Button variant="contained" color="primary" xs={12} onClick={this.handleExecuteTrajectory}>Execute Trajectory</Button>
	  </Grid>
		  </Grid>	
		  
		  <Grid container spacing={2} alignItems="center">
		  <Grid item>
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
		  <Grid item>
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
		  </Grid>		  
		  <PointListEditor/>
		  </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
	  input_target: state.input_target
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setInputTarget: point => dispatch({type: "INPUT_TARGET_SET", payload: point}),    
  };
}

PropulsionControlPanel = connect(mapStateToProps, mapDispatchToProps)(PropulsionControlPanel);

export {PropulsionControlPanel as default};