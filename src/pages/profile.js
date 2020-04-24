import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LanguageIcon from "@material-ui/icons/Language";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

//Redux
import { connect } from "react-redux";

// components
import Searchbar from "../components/Searchbar";
import EditProfile from "../components/EditProfile";
import PersonalTweets from "../components/PersonalTweets";
import Likes from "../components/Likes";
import Media from "../components/Media";
import WithReplies from "../components/WithReplies";

const styles = (theme) => ({
  ...theme.classes,
  homebar: {
    color: "#fff",
    cursor: "pointer",
  },
  intro: {
    marginTop: 10,
  },
  tweetDiv: {
    marginLeft: "10%",
    "& .tweetButtons": {
      marginRight: 10,
      marginTop: 5,
    },
  },
  home: {
    borderLeft: "1px solid #fff",
    height: "780px",
    paddingLeft: 20,
  },

  tweets: {
    border: "1px solid #fff",
    background: "#000",
    height: "750px",
    overflow: "auto",
  },
  "& span": {
    color: "#fff",
  },
  link: {
    padding: "5px 5px 5px 5px",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  tweetLinks: {
    marginTop: 10,
    "& .header": {
      color: "#fff",
      cursor: "pointer",
      width: "25%",
      height: 40,
      verticalAlign: "center",
      "&:hover": {
        backgroundColor: "#021622",
        color: "#1da1f2",
      },
    },
  },
});

class profile extends Component {
  openEditProfile = (event) => {};
  render() {
    const {
      classes,
      user: {
        credentials: {
          username,
          createdAt,
          imageUrl,
          bio,
          website,
          location,
          fullname,
          dob,
        },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Fragment>
          <div style={{ display: "flex", marginTop: 5 }}>
            <svg
              viewBox='0 0 24 24'
              style={{ cursor: "pointer", margin: "10px 20px 20px 10px" }}>
              <g>
                <path d='M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z'></path>
              </g>
            </svg>
            <div>
              <span style={{ fontSize: 14, color: "#fff" }}>{fullname}</span>
              <br />
              <span style={{ fontWeight: 100, fontSize: 11, color: "#fff" }}>
                50 Tweets
              </span>
            </div>
          </div>
          <Paper elevation={3} className={classes.tweets}>
            <Fragment>
              <div
                style={{
                  height: "150px",
                  overflow: "hidden",
                  position: "relative",
                }}>
                <img
                  src={imageUrl}
                  style={{
                    width: 500,
                    height: 200,
                    objectFit: "cover",
                  }}
                  alt='Header'
                />
              </div>
              <div style={{ position: "absolute", top: "20%", marginLeft: 10 }}>
                <img
                  src={imageUrl}
                  style={{
                    width: 100,
                    height: 100,
                    border: "3px solid #000",
                    borderRadius: "50%",
                  }}
                  alt='Header'
                />
              </div>
            </Fragment>
            <span>
              <EditProfile />
            </span>

            <div style={{ marginLeft: 15, marginTop: 15 }}>
              <Typography variant='body2'>{fullname}</Typography>
              <span style={{ fontWeight: 100, fontSize: 11, color: "#fff" }}>
                @{username}
              </span>
              {bio && (
                <Typography
                  variant='body2'
                  style={{ marginTop: 10, marginBottom: 10 }}>
                  {bio}
                </Typography>
              )}
              {location && (
                <span style={{ fontWeight: 100, fontSize: 11, color: "#fff" }}>
                  <LocationOnIcon color='secondary' fontSize='small' />
                  {location}
                </span>
              )}
              {website && (
                <a
                  style={{ fontWeight: 100, fontSize: 11, color: "#fff" }}
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <LanguageIcon color='secondary' fontSize='small' /> {website}
                </a>
              )}
              {dob && (
                <div>
                  <FiberManualRecordIcon color='secondary' fontSize='small' />
                  <span>{dob}</span>
                </div>
              )}
              <span style={{ fontWeight: 100, fontSize: 11, color: "#fff" }}>
                <CalendarTodayIcon color='secondary' fontSize='small' /> Joined
                {dayjs(createdAt).format("MMMM YYYY")}
              </span>
            </div>
            <div style={{ marginLeft: 10, marginTop: 10 }}>
              <Typography
                variant='caption'
                component={Link}
                className={classes.link}
                to={`${username}/following`}>
                <span style={{ fontWeight: 800 }}>100</span> Following
              </Typography>
              <Typography
                variant='caption'
                component={Link}
                className={classes.link}
                to={`${username}/followers`}>
                <span style={{ fontWeight: 800 }}>100</span> Followers
              </Typography>
            </div>

            <div className={classes.tweetLinks}>
              <Button
                size='small'
                className='header'
                component={NavLink}
                activeStyle={{ color: "#1da1f2" }}
                to={`profile/${username}`}
                exact>
                Tweets
              </Button>
              <Button
                size='small'
                className='header'
                component={NavLink}
                activeStyle={{ color: "#1da1f2" }}
                to={`profile/${username}/with_replies`}
                exact>
                &amp; Replies
              </Button>
              <Button
                size='small'
                className='header'
                component={NavLink}
                activeStyle={{ color: "#1da1f2" }}
                to={`profile/${username}/media`}
                exact>
                Media
              </Button>
              <Button
                size='small'
                className='header'
                component={NavLink}
                activeStyle={{ color: "#1da1f2" }}
                to={`profile/${username}/likes`}
                exact>
                Likes
              </Button>
            </div>
            <hr />
            <div>
              <div>
                <Route
                  exact
                  path={`profile/${username}`}
                  component={PersonalTweets}
                />
                <Route
                  exact
                  path={`profile/${username}/with_replies`}
                  component={WithReplies}
                />
                <Route
                  exact
                  path={`profile/${username}/media`}
                  component={Media}
                />
                <Route
                  exact
                  path={`profile/${username}/likes`}
                  component={Likes}
                />
              </div>
            </div>
          </Paper>
        </Fragment>
      ) : (
        <Paper>
          <Typography variant='body2' align='center'>
            Something went wrong
          </Typography>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={5}>
            {profileMarkup}
          </Grid>
          <Grid item xs={5} className={classes.home}>
            <Searchbar />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(profile));
