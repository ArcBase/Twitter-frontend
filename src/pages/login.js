import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.classes,
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <div className='loginForm'>
          <h3>Login</h3>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              name='email'
              label='Email'
              variant='outlined'
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              color='secondary'
              InputProps={{
                className: classes.multilineColor,
              }}
              type='email'
              size='small'
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email}
              className={classes.textfield}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              name='password'
              label='Password'
              variant='outlined'
              color='secondary'
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                className: classes.multilineColor,
              }}
              type='password'
              size='small'
              fullWidth
              error={errors.password ? true : false}
              helperText={errors.password}
              className={classes.textfield}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant='contained'
              boxShadow={0}
              type='submit'
              fullWidth
              disabled={loading}
              disableElevation
              style={{
                marginTop: 10,
                marginBottom: 20,
                border: "1px solid #1da1f2",
                backgroundColor: "#000",
                color: "#fff",
                textTransform: "none",
                position: "relative",
              }}>
              Log in
              {loading && (
                <CircularProgress
                  disableShrink
                  size={20}
                  className={classes.progress}
                />
              )}
            </Button>
          </form>
          <p>Don't have an account?</p>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/signup'
            boxShadow={0}
            disableElevation
            fullWidth
            style={{
              marginBotton: 20,
              border: "1px solid #fff",
              textTransform: "none",
            }}>
            Sign up
          </Button>
        </div>
      </Fragment>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(login));
