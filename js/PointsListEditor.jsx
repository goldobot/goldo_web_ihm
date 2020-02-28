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



class PointListEditorPoint extends React.Component{
	
    constructor(props) {
    super(props);
	this.onXChange = this.onXChange.bind(this);	
    this.onYChange = this.onYChange.bind(this);
	}
    
    onXChange(event)
    {
        this.props.onChange([event.target.value*0.001,this.props.point[1]]);        
    }
    
    onYChange(event)
    {
        this.props.onChange([this.props.point[0], event.target.value*0.001]);        
    }
    
	  render() {		
    return(
    <React.Fragment>
	<Grid item xs={4}>
    <Input
	onChange={this.onXChange}
	value = {this.props.point[0]*1000}
		  inputProps={{
              step: 10,
              min: 0,
              max: 2000,
              type: 'number'             
            }}
		  />
          </Grid>
          <Grid item xs={4}>
		  <Input
		  onChange={this.onYChange}
	value = {this.props.point[1]*1000}
		  inputProps={{
              step: 10,
              min: -1500,
              max: 1500,
              type: 'number'             
            }}
		  />
  </Grid>
   <Grid item xs={4}>
   <IconButton size="small" color="primary" aria-label="add">
  <AddIcon />
</IconButton>
<IconButton size="small" color="primary" aria-label="add">
  <DeleteIcon />
</IconButton>
   </Grid>
  </React.Fragment>		
		)
	  }
	
}

class PointListEditor extends React.Component{
	
	constructor(props) {
    super(props);
	this.onAddClicked = this.onAddClicked.bind(this);
    this.onPointChange = this.onPointChange.bind(this);	
	}
	
    
	onAddClicked()
	{
		this.props.addPoint([0,0]);
	};
    
    onPointChange(index)
	{
       	return function(point)
        {
            this.props.setPoint(point, index);
        }.bind(this);
	};
    
    
	  render() {
		  const pointsItems = this.props.points.map((point, index) =>
        <PointListEditorPoint key={index.toString()} point={point} onChange={this.onPointChange(index)} />
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

const mapStateToProps = state => {
  return { points: state.trajectory_input };
};

function mapDispatchToProps(dispatch) {
  return {
    addPoint: point => dispatch({type: "TRAJECTORY_INPUT_ADD_POINT", payload: point}),
    setPoint: (point, index) => dispatch({type: "TRAJECTORY_INPUT_SET_POINT", payload: point, index: index})
  };
}

PointListEditor = connect(mapStateToProps, mapDispatchToProps)(PointListEditor);


export {PointListEditor as default};