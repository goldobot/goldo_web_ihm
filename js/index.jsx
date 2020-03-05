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


import TableView from "./TableView.jsx";
import PropulsionControlPanel from "./PropulsionControlPanel.jsx";
import PropulsionStatusPanel from "./PropulsionStatusPanel.jsx"

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux'

import store from './store.js';
import ros from './ros.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {

  
  const classes = useStyles();
  
  return (
    <React.Fragment>
    <AppBar position="static">
	<Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Connection</Button>
        </Toolbar>
	</AppBar>
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={4}>
		<PropulsionControlPanel/>
          
        </Grid>
        <Grid container item xs={8}>
          <TableView />
		  <PropulsionStatusPanel />
        </Grid>
      </Grid>
    </Container>
	</React.Fragment>
  );
}

window.store = store;
window.ros = ros;

window.ros_services = {
  set_motors_enable: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/motors/set_enable",
    serviceType: "goldo_msgs/SetBool"
  }),
  set_propulsion_enable: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/propulsion/set_enable",
    serviceType: "goldo_msgs/SetBool"
  }),
  motors_set_pwm: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/motors/set_pwm",
    serviceType: "goldo_msgs/SetMotorsPwm"
  }),
    propulsion_point_to: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/propulsion/point_to",
    serviceType: "goldo_msgs/PropulsionPointTo"
  }),
      propulsion_move_to: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/propulsion/move_to",
    serviceType: "goldo_msgs/PropulsionMoveTo"
  }),
        propulsion_execute_trajectory: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/propulsion/execute_trajectory",
    serviceType: "goldo_msgs/PropulsionExecuteTrajectory"
  })
  
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
	<Provider store={store}>
		<App />
	</Provider>
  </ThemeProvider>,
  document.querySelector("#app")
);
