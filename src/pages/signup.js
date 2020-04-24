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
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.classes,
});

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    this.setState({
      loading: true,
    });
    const newUserData = {
      fullname: this.state.fullname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signupUser(newUserData, this.props.history);
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
          <h3>Signup</h3>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              name='fullname'
              label='Fullname'
              variant='outlined'
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              color='secondary'
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                className: classes.multilineColor,
              }}
              type='text'
              size='small'
              fullWidth
              error={errors.fullname ? true : false}
              helperText={errors.fullname}
              className={classes.textfield}
              value={this.state.fullname}
              onChange={this.handleChange}
            />
            <Typography
              variant='caption'
              style={{
                fontWeight: 100,
                fontSize: 11,
                color: "#fff",
                float: "right",
                marginBottom: 10,
                marginTop: -10,
              }}>
              {this.state.fullname.length}/50
            </Typography>
            <TextField
              name='username'
              label='Username'
              variant='outlined'
              inputProps={{
                maxLength: 30,
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              color='secondary'
              InputProps={{
                className: classes.multilineColor,
              }}
              type='text'
              size='small'
              fullWidth
              error={errors.username ? true : false}
              helperText={errors.username}
              className={classes.textfield}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Typography
              variant='caption'
              style={{
                fontWeight: 100,
                fontSize: 11,
                color: "#fff",
                float: "right",
                marginBottom: 10,
                marginTop: -10,
              }}>
              {this.state.username.length}/30
            </Typography>
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
            <TextField
              name='confirmPassword'
              label='Confirm Password'
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
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              className={classes.textfield}
              value={this.state.confirmPassword}
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
              color='primary'
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
              Sign up
              {loading && (
                <CircularProgress
                  disableShrink
                  size={20}
                  className={classes.progress}
                />
              )}
            </Button>
          </form>
          <p>Already have an account?</p>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/login'
            boxShadow={0}
            disableElevation
            fullWidth
            style={{
              marginBotton: 20,
              border: "1px solid #fff",
              textTransform: "none",
            }}>
            Log in
          </Button>
        </div>
      </Fragment>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(signup));
