import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import ROSLIB from 'roslib';

import { connect } from "react-redux";

import img_table_bg from '../images/table_bg.png';

function rect(props) {
    const {ctx, x, y, width, height} = props;
	ctx.fillStyle ='red';
    ctx.fillRect(y * 200 + 330, x * 200 + 30, width, height);
}

function draw_float(ctx, x, y, color)
{
	ctx.beginPath();
	ctx.arc(y * 200 + 330, x * 200 + 30, 0.036*200, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();	
	ctx.stroke();
};

function draw_marker(ctx, x, y, yaw, color)
{
	ctx.beginPath();
	ctx.arc(y * 200 + 330, x * 200 + 30, 0.025*200, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();	
	ctx.stroke();
};

function drawRobot(ctx, pose, footprint)
{
	ctx.setTransform();
	ctx.transform(0,200,200,0,330,30);
	ctx.translate(pose.position.x, pose.position.y);
	ctx.rotate(pose.yaw);
	ctx.beginPath();
	ctx.moveTo(footprint[0][0], footprint[0][1]);
	for( var i=0 ; i < footprint.length ; i++ ){
		ctx.lineTo( footprint[i][0], footprint[i][1]);
		}
	ctx.closePath();
	
	ctx.fillStyle = 'red';
	ctx.fill();
	//ctx.stroke();
	
}

function drawTrajectory(ctx, points)
{
	if(points.length == 0)
	{
		return;
	}
	ctx.setTransform();
	ctx.transform(0,200,200,0,330,30);
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	for( var i=0 ; i < points.length ; i++ ){
		ctx.lineTo( points[i][0], points[i][1]);
		}	
	ctx.setTransform();
	ctx.stroke();
}

class TableView extends React.Component {
  componentDidMount() {
	  this.updateCanvas = this.updateCanvas.bind(this);
	const img = this.refs.image;
	img.onload = () => {
		this.updateCanvas();
	}
	var listener = new ROSLIB.Topic({
     ros : window.ros,
     name : '/goldo/stm32/odometry',
    messageType : 'goldo_msgs/RobotPose'
  });
  
    this.markers = [];
  this.polygons = [];
  this.robot_footprint = [[0,0]];
  
  var param_markers = new ROSLIB.Param({
      ros : ros,
      name : '/goldo/markers'
    });
	param_markers.get(this.updateMarkers.bind(this));
	
	var param_polygons = new ROSLIB.Param({
      ros : ros,
      name : '/goldo/polygons'
    });
	param_polygons.get(this.updatePolygons.bind(this));
  
  	var param_robot_footprint = new ROSLIB.Param({
      ros : ros,
      name : '/goldo/robots/robot1/footprint'
    });
	param_robot_footprint.get(this.updateRobotFootprint.bind(this));
	
  listener.subscribe(this.updateRobotPose.bind(this));
  
  this.robot_pose = {position:{ x:0, y:0}};


  }
  
  updateMarkers(param_markers)
  {
	  var markers = [];
	  for (const [key, value] of Object.entries(param_markers)) {
	markers.push({x: value.x * 0.001, y: value.y * 0.001, yaw: value.yaw*Math.M_PI/180, id: key});
	}
	this.markers = markers;
  }
  
  updatePolygons(param_polygons)
  {
	   var polygons = [];
	  for (const [key, value] of Object.entries(param_polygons)) {
	polygons.push(value);
	}
	this.polygons = polygons;
  }
  
  updateRobotPose(message)
  {
	  this.robot_pose=message;
  }
  
   updateRobotFootprint(message)
  {
	  this.robot_footprint=message;
	  console.log(this.robot_footprint);
  }
  
  handleClick(e) {
        console.log('INSIDE');
        this.setState({inside: 'inside'});
    }
  
  updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
		ctx.setTransform();
		const img = this.refs.image;
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 660, 460);
        ctx.drawImage(img, 30, 30);
        // draw children “components”
		
		draw_float(ctx, 1.450,1.567, 'green');
		draw_float(ctx, 1.525,1.567, 'red');
		draw_float(ctx, 1.600,1.567, 'green');
		draw_float(ctx, 1.675,1.567, 'red');
		draw_float(ctx, 1.750,1.567, 'green');
		
		draw_float(ctx, 1.450,-1.567, 'red');
		draw_float(ctx, 1.526,-1.567, 'green');
		draw_float(ctx, 1.600,-1.567, 'red');
		draw_float(ctx, 1.675,-1.567, 'green');
		draw_float(ctx, 1.750,-1.567, 'red');
		
		draw_float(ctx, -0.067,0.500, 'gray');
		draw_float(ctx, -0.067,0.575, 'gray');
		draw_float(ctx, -0.067,0.650, 'gray');
		draw_float(ctx, -0.067,0.725, 'gray');
		draw_float(ctx, -0.067,0.800, 'gray');
		
		draw_float(ctx, -0.067,-0.500, 'gray');
		draw_float(ctx, -0.067,-0.575, 'gray');
		draw_float(ctx, -0.067,-0.650, 'gray');
		draw_float(ctx, -0.067,-0.725, 'gray');
		draw_float(ctx, -0.067,-0.800, 'gray');
		
		for(const marker of this.markers)
		{
			draw_marker(ctx, marker.x, marker.y, marker.yaw, 'yellow');
		}
		
		for(const poly of this.polygons)
		{
			ctx.beginPath();
			const vertices = poly.vertices;
			ctx.moveTo(vertices[0][1] * 200 + 330, vertices[0][0] * 200 + 30);
			for( var i=0 ; i < vertices.length ; i++ ){
				ctx.lineTo( vertices[i][1] * 200 + 330, vertices[i][0] * 200 + 30 );
				}
			ctx.closePath();
			ctx.fill();
		}
		
		drawTrajectory(ctx, this.props.trajectory_input);
		//drawRobot(ctx, this.robot_pose, this.robot_footprint);
		requestAnimationFrame(this.updateCanvas);
    }
  render() {
    return(
      <div>
        <canvas ref="canvas" width={660} height={460} onClick={this.handleClick.bind(this)} />
		<img ref="image" src={img_table_bg} style={{visibility: "hidden"}} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { markers: state.markers,
trajectory_input: state.trajectory_input  };
};

TableView = connect(mapStateToProps)(TableView);
export {TableView as default};