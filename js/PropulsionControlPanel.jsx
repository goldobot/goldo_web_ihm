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

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux";


const mapStateToProps2 = (state, ownProps) => {
  return { point: state.trajectory_input[ownProps.index] };
};

function mapDispatchToProps2(dispatch, ownProps) {
	console.log(ownProps);
  return {
    onXChanged: event => dispatch({type: "TRAJECTORY_INPUT_SET_POINT_X", payload:event.target.value*0.001,index:ownProps.index}),
	onYChanged: event => dispatch({type: "TRAJECTORY_INPUT_SET_POINT_Y", payload:event.target.value*0.001,index:ownProps.index})
  };
}


class PointEditor extends React.Component{
	
	  render() {		
    return(
	<Grid item xs={12}>
    <Input
	onChange={this.props.onXChanged}
	value = {this.props.point[0]*1000}
		  inputProps={{
              step: 10,
              min: 0,
              max: 2000,
              type: 'number'             
            }}
		  />
		  <Input
		  onChange={this.props.onYChanged}
	value = {this.props.point[1]*1000}
		  inputProps={{
              step: 10,
              min: -1500,
              max: 1500,
              type: 'number'             
            }}
		  />
  </Grid>
		
		)
	  }
	
}

PointEditor = connect(mapStateToProps2, mapDispatchToProps2)(PointEditor);

class PointListEditor extends React.Component{
	
	constructor(props) {
    super(props);
	this.onAddClicked = this.onAddClicked.bind(this);	
	}
	
	onAddClicked()
	{
		this.props.addPoint([0,0]);
	};
	  render() {
		  const pointsItems = this.props.trajectory_input.map((point, index) =>
        <PointEditor key={index.toString()} index={index}/>
);
    return(
	<Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography  gutterBottom>
        Points
		</Typography>
        </Grid>
		{pointsItems}
		<Grid item xs={12}>
		<Fab size="small" color="primary" aria-label="add" onClick={this.onAddClicked}>
  <AddIcon />
</Fab>
		</Grid>
		</Grid>
		
		)
	  }
	
}

const mapStateToProps1 = state => {
  return { trajectory_input: state.trajectory_input };
};

function mapDispatchToProps1(dispatch) {
  return {
    addPoint: point => dispatch({type: "TRAJECTORY_INPUT_ADD_POINT", payload: point})
  };
}

PointListEditor = connect(mapStateToProps1, mapDispatchToProps1)(PointListEditor);


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