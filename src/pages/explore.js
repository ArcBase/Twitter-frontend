import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import image from "../images/login.png";

const styles = (theme) => ({
  ...theme.classes,
  image: {
    width: 220,
    height: 220,
    margin: "auto",
    display: "block",
  },
  loginBox: {
    marginBottom: 15,
    width: "100%",
  },
  login: {
    border: "1px solid #1da1f2",
    borderRadius: 25,
    textTransform: "none",
  },
  signup: {
    border: "1px solid #fff",
    borderRadius: 25,
    textTransform: "none",
  },
});

class explore extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper variant='outlined' className='explore' square>
          <img src={image} alt='Login' className={classes.image} />
          <div className={classes.loginBox}>
            <h4>See what’s happening in the world right now</h4>
            <div className='logindiv'>
              <Button
                variant='contained'
                color='primary'
                boxShadow={0}
                component={Link}
                to='/login'
                disableElevation
                className='loginRedirect'>
                Log in
              </Button>
            </div>
            <div className='signupdiv'>
              <Button
                variant='contained'
                color='secondary'
                boxShadow={0}
                component={Link}
                to='/signup'
                disableElevation
                className='signupRedirect'>
                Sign up
              </Button>
            </div>
          </div>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(explore);
