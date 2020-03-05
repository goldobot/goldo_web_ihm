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






class PropulsionStatusPanel extends React.Component {
  
  componentDidMount() {
  }
  componentDidUpdate()
  {
	  	
  }  
  
  render() {
	  const propulsion_state_names = {0: "Inactive", 1: "Stopped", 2: "FollowTrajectory", 3: "Rotate", 4: "Cruise", 5: "ManualControl", 7: "Error"};
	  
    return(
	<Grid item>
	<Typography>{propulsion_state_names[this.props.propulsion.state]}</Typography>
	</Grid >
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
    
  };
}

PropulsionStatusPanel = connect(mapStateToProps, mapDispatchToProps)(PropulsionStatusPanel);

export {PropulsionStatusPanel as default};