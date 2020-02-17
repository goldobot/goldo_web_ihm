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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Canvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.refs.image
	ctx.fillText("Foo", 210, 75)
	window.ctx = ctx
  }
  render() {
    return(
      <div>
        <canvas ref="canvas" width={600} height={400} />
      </div>
    )
  }
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Copyright />		
      </Box>
	  <Canvas/>
    </Container>
  );
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#app'),
);
window.ros = new ROSLIB.Ros({url : 'ws://10.42.64.1:9090'});