import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
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
		  <Input
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

export {PropulsionControlPanel as default};