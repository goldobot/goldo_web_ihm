import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import ROSLIB from "roslib";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TableView from "./TableView.jsx";

export default function App() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    console.log("foo");

    var request = new ROSLIB.ServiceRequest({ value: event.target.checked });

    window.ros_services.set_motors_enable.callService(request);
  };
  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange("checkedA")}
              />
            }
            label="MotorsEnable"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange("checkedB")}
              />
            }
            label="PropulsionEnable"
          />
        </Grid>
        <Grid item xs={9}>
          <TableView />
        </Grid>
      </Grid>
    </Container>
  );
}

window.ros = new ROSLIB.Ros({ url: "ws://10.42.64.1:9090" });
window.ros_services = {
  set_motors_enable: new ROSLIB.Service({
    ros: window.ros,
    name: "/goldo/stm32/set_motors_enable",
    serviceType: "goldo_msgs/SetBool"
  })
};
ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector("#app")
);
