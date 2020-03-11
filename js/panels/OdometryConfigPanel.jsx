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




class OdometryConfigPanel extends React.Component {
	constructor(props) {
    super(props);
  }
  

  
  render() {
    return(
	<React.Fragment>      
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
		  </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
	  odometry: state.odometry
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setInputTarget: point => dispatch({type: "INPUT_TARGET_SET", payload: point}),
  };
}

OdometryConfigPanel = connect(mapStateToProps, mapDispatchToProps)(PropulsionControlPanel);

export {OdometryConfigPanel as default};