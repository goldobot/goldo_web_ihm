import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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

function draw_marker(ctx, marker, color)
{
	ctx.save();
	var radius = 0.025;
	ctx.beginPath();
	ctx.arc(marker.position.y * 200 + 330, marker.position.x * 200 + 30, radius*200, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();	
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(marker.position.y * 200 + 330, marker.position.x * 200 + 30);
	ctx.lineTo((marker.position.y + radius * Math.sin(marker.yaw)) * 200 + 330, (marker.position.x + radius * Math.cos(marker.yaw)) * 200 + 30);
	ctx.lineWidth = 2
	ctx.stroke()
	ctx.restore();
};

function drawRobot(ctx, pose, footprint)
{
	if (footprint.length == 0)
	{
		return;
	}
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
    
	ctx.setTransform();
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.stroke();
	
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
	ctx.lineWidth = 2;
	ctx.stroke();
	
	if(points.length == 4)
	{
		ctx.setTransform();
		ctx.transform(0,200,200,0,330,30);
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		ctx.bezierCurveTo(points[1][0], points[1][1], points[2][0], points[2][1], points[3][0], points[3][1] );
		ctx.setTransform();
		ctx.stroke();
		return;
	}
}

class TableView extends React.Component {
  componentDidMount() {
	  this.updateCanvas = this.updateCanvas.bind(this);
	const img = this.refs.image;
	img.onload = () => {
		this.updateCanvas();
	}
  this.robot_footprint = [[0,0]];  	

  }
  

  
  handleClick(e) {
        console.log('INSIDE');
        this.setState({inside: 'inside'});
    }
  
  updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
		ctx.setTransform();
		const img = this.refs.image;
		ctx.fillStyle = "aqua";
		ctx.fillRect(0, 0, 660, 460);
        ctx.drawImage(img, 30, 30);
        // draw children “components”
		
		draw_float(ctx, 1.450,1.567, 'green');
		draw_float(ctx, 1.525,1.567, 'red');
		draw_float(ctx, 1.600,1.567, 'green');
		draw_float(ctx, 1.675,1.567, 'red');
		draw_float(ctx, 1.750,1.567, 'green');
		
		draw_float(ctx, 1.450,-1.567, 'red');
		draw_float(ctx, 1.525,-1.567, 'green');
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
		
		this.props.markers.forEach((marker) => {draw_marker(ctx, marker, 'yellow')});
		this.props.polygons.forEach((polygon) => {draw_polygon(ctx, polygon, 'yellow')});
		
		/*
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
		}*/
		
		drawTrajectory(ctx, this.props.trajectory_input);
		drawRobot(ctx, this.props.robots.robot1.pose, this.props.robots.robot1.footprint);
		draw_marker(ctx, this.props.target_pose, 'blue')
		requestAnimationFrame(this.updateCanvas);
    }
  render() {
    return(
      <div>
        <canvas ref="canvas" width={660} height={460} onClick={this.handleClick.bind(this)} />
		<img ref="image" src={img_table_bg} style={{display: "none"}} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { markers: state.markers,
  polygons: state.polygons,
trajectory_input: state.trajectory_input,
 robots: state.robots,
target_pose: state.propulsion.target_pose };
};

TableView = connect(mapStateToProps)(TableView);
export {TableView as default};