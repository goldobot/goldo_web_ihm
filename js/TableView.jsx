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
  
  listener.subscribe(this.updateRobotPose.bind(this));
  
  this.robot_pose = {position:{ x:0, y:0}};

  }  
  
  updateRobotPose(message)
  {
	  this.robot_pose=message;
  }
  
  handleClick(e) {
        console.log('INSIDE');
        this.setState({inside: 'inside'});
    }
  
  updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
		const img = this.refs.image;
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 660, 460);
        ctx.drawImage(img, 30, 30);
        // draw children “components”
        rect({ctx, x: this.robot_pose.position.x, y: this.robot_pose.position.y, width: 50, height: 50});
        rect({ctx, x: 110, y: 110, width: 50, height: 50});
		
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
		
		requestAnimationFrame(this.updateCanvas);
    }
  render() {
    return(
      <div>
        <canvas ref="canvas" width={660} height={460} onClick={this.handleClick.bind(this)} />
		<img ref="image" src="table_bg.png" style={{visibility: "hidden"}} />
      </div>
    )
  }
}

export { TableView as default};