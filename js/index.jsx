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

import PropTypes from 'prop-types';

import FormControlLabel from "@material-ui/core/FormControlLabel";

import Grid from "@material-ui/core/Grid";


import TableView from "./TableView.jsx";
import PropulsionControlPanel from "./PropulsionControlPanel.jsx";
import PropulsionStatusPanel from "./PropulsionStatusPanel.jsx"

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

function TabPanel(props) {  
  const { children, value, index, ...other } = props;  
  
  return (  
    <Typography  
      component="div"  
      role="tabpanel"  
      hidden={value !== index}  
      id={`simple-tabpanel-${index}`}  
      aria-labelledby={`simple-tab-${index}`}  
      {...other}  
    >  
      {value === index && <Box p={3}>{children}</Box>}  
    </Typography>  
  );  
}  

TabPanel.propTypes = {  
  children: PropTypes.node,  
  index: PropTypes.any.isRequired,  
  value: PropTypes.any.isRequired,  
};  

export default function App() {

  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <React.Fragment>
    <AppBar position="static">
	<Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Tabs value={value} onChange={handleChange} >
			  <Tab label="Config Odometry" />
			  <Tab label="Config Propulsion" />
			  <Tab label="Test Propulsion" />
			  <Tab label="Test Actuators" />
			  <Tab label="Test Sequences" />
        </Tabs>
          <Button color="inherit">Connection</Button>
        </Toolbar>
	</AppBar>
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={4}>
		<TabPanel value={value} index={2}>
			<PropulsionControlPanel />
		</TabPanel>
          
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
