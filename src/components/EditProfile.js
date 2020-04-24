import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Tooltip from "@material-ui/core/Tooltip";

//Redux
import { connect } from "react-redux";
import { editUserDetails, uploadImage } from "../redux/actions/userActions";

//components

const styles = (theme) => ({
  ...theme.classes,
  homebar: {
    color: "#fff",
    cursor: "pointer",
  },
  "& span": {
    color: "#fff",
  },
  actions: {
    position: "relative",
    backgroundColor: "#000",
    padding: "5px 1px",
    verticalAlign: "center",
  },
  dialogContent: {
    backgroundColor: "#000",
    border: "0.1em solid #111111",
    padding: "0px 0px 8px 0px",
  },
});

class EditProfile extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    imageUrl: "",
    fullname: "",
    open: false,
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      imageUrl: credentials.imageUrl ? credentials.imageUrl : "",
      fullname: credentials.fullname ? credentials.fullname : "",
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Button
          variant='contained'
          boxShadow={0}
          type='submit'
          disableElevation
          onClick={this.handleOpen}
          size='small'
          style={{
            border: "1px solid #1da1f2",
            textTransform: "none",
            backgroundColor: "#000",
            color: "#fff",
            position: "relative",
            borderRadius: 25,
            left: "75%",
            marginTop: 10,
          }}>
          Edit Profile
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          style={{ height: "75%", overflow: "auto" }}
          fullWidth
          maxWidth='xs'>
          <div className={classes.actions}>
            <span>
              <CloseIcon
                onClick={this.handleClose}
                color='secondary'
                style={{
                  cursor: "pointer",
                  float: "left",
                  marginTop: 5,
                  marginLeft: 10,
                }}
              />
            </span>
            <Typography
              variant='button'
              style={{
                color: "#fff",
                marginTop: 5,
                marginLeft: 20,
                textTransform: "none",
              }}>
              Edit Profile
            </Typography>
            <Button
              onClick={this.handleSubmit}
              variant='contained'
              disableElevation
              style={{
                float: "right",
                marginTop: 5,
                border: "1px solid #000",
                backgroundColor: "#1da1f2",
                borderRadius: 25,
                textTransform: "none",
                color: "#fff",
                marginRight: 10,
              }}
              size='small'>
              Save
            </Button>
          </div>
          <DialogContent className={classes.dialogContent}>
            <div
              style={{
                display: "block",
                height: "100%",
                position: "relative",
              }}>
              <img
                src={this.state.imageUrl}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                }}
                alt='Header'
              />
              <div style={{ position: "absolute", top: "60%", marginLeft: 10 }}>
                <img
                  src={this.state.imageUrl}
                  style={{
                    width: 100,
                    height: 100,
                    border: "3px solid #000",
                    borderRadius: "50%",
                  }}
                  alt='Header'
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "49%",
                  cursor: "pointer",
                }}>
                <input
                  type='file'
                  id='imageInput'
                  onChange={this.handleImageChange}
                  hidden='hidden'
                />
                <Tooltip title='Edit profile picture' placement='top'>
                  <CameraAltIcon
                    style={{
                      color: "#1da1f2",
                      backgroundColor: "black",
                      borderRadius: "50%",
                    }}
                    onClick={this.handleEditPicture}
                  />
                </Tooltip>
              </div>
            </div>
            <div style={{ marginTop: "20%", padding: "0px 10px" }}>
              <form>
                <TextField
                  name='fullname'
                  type='text'
                  label='Name'
                  color='secondary'
                  placeholder='Your name'
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  variant='filled'
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                  fullWidth
                  className={classes.textfield}
                  InputProps={{
                    className: classes.multilineColor,
                  }}
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
                  name='bio'
                  type='text'
                  label='Bio'
                  multiline
                  color='secondary'
                  rows='5'
                  placeholder='A short bio about yourself'
                  value={this.state.bio}
                  onChange={this.handleChange}
                  variant='filled'
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  inputProps={{
                    maxLength: 160,
                  }}
                  fullWidth
                  className={classes.textfield}
                  InputProps={{
                    className: classes.multilineColor,
                  }}
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
                  {this.state.bio.length}/100
                </Typography>
                <TextField
                  name='website'
                  type='text'
                  label='Website'
                  color='secondary'
                  placeholder='Your personal/professional website'
                  value={this.state.website}
                  onChange={this.handleChange}
                  variant='filled'
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  inputProps={{
                    maxLength: 30,
                  }}
                  fullWidth
                  className={classes.textfield}
                  InputProps={{
                    className: classes.multilineColor,
                  }}
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
                  {this.state.website.length}/30
                </Typography>
                <TextField
                  name='location'
                  type='text'
                  label='Location'
                  color='secondary'
                  placeholder='Where are you?'
                  value={this.state.location}
                  onChange={this.handleChange}
                  variant='filled'
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  inputProps={{
                    maxLength: 100,
                  }}
                  fullWidth
                  className={classes.textfield}
                  InputProps={{
                    className: classes.multilineColor,
                  }}
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
                  {this.state.location.length}/100
                </Typography>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});
const mapActionsToProps = {
  editUserDetails,
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(EditProfile));
