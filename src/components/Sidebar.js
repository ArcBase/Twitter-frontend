import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import '../styles/Sidebar.css'

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MessageIcon from "@material-ui/icons/Message";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SubjectIcon from "@material-ui/icons/Subject";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";

import image from "../images/twitter.png";
import profileImage from "../images/afe.jpg";

const styles = (theme) => ({
  ...theme.classes,
  redirect: {
    marginTop: 10,
    "& .nav-text": {
      textTransform: "none",
      fontWeight: 100,
    },
    "& .active": {
      color: "#1da1f2",
    },
    "& .linkButton": {
      borderRadius: 25,
      color: "#fffffd",
      padding: "0px 20px 0px 15px",
      "&:hover": {
        backgroundColor: "#021622",
        color: "#1da1f2",
      },
    },
  },
  iconButton: {
    marginBottom: 5,
    marginTop: 5,
  },
  tweetButton: {
    marginTop: 20,
    border: "1px solid #000",
    backgroundColor: "#1da1f2",
    borderRadius: 25,
    textTransform: "none",
    color: "#fff",
  },
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='sidebar'>
        <img
          src={image}
          alt='Logo'
          style={{ width: 30, height: 30, marginLeft: 15 }}
        />
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/explore'>
            <ExploreIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Explore</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/'>
            <HomeIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;&nbsp;Home</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/settings'>
            <SettingsIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Settings</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/notifications'>
            <NotificationsIcon
              className={classes.iconButton}
              fontSize='small'
            />
            <span className='nav-text'>&nbsp;&nbsp;Notifications</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/messages'>
            <MessageIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Messages</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/bookmarks'>
            <BookmarkIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Bookmarks</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/lists'>
            <SubjectIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Lists</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button
            component={NavLink}
            className='linkButton'
            activeStyle={{ color: "#1da1f2" }}
            exact
            to='/profile'>
            <img
              src={profileImage}
              alt='profile'
              style={{
                height: 24,
                width: 24,
                borderRadius: "50%",
                marginBottom: 5,
                marginTop: 5,
              }}
            />
            <span className='nav-text'>&nbsp;&nbsp;Profile</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button className='linkButton'>
            <MoreHorizIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;More</span>
          </Button>
        </div>
        <div className={classes.redirect}>
          <Button className='linkButton'>
            <CreateIcon className={classes.iconButton} fontSize='small' />
            <span className='nav-text'>&nbsp;&nbsp;Tweet</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
