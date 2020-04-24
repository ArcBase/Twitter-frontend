import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import LoopIcon from "@material-ui/icons/Loop";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Redux
import { connect } from "react-redux";
import { likeTweet, unlikeTweet } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.classes,
  card: {
    display: "flex",
    padding: 2,
    borderRadius: 16,
    background: "none",
  },
  media: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    margin: "5px 5px 5px 5px",
  },
  content: {
    padding: "5px 5px 5px 5px",
    color: "#fff",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 5,
  },
  icons: {
    color: "#fff",
    cursor: "pointer",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
});

class Tweets extends Component {
  likedTweet = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.tweetId === this.props.tweet.tweetId,
      )
    )
      return true;
    else return false;
  };
  likeTweet = () => {
    this.props.likeTweet(this.props.tweet.tweetId);
  };
  unlikeTweet = () => {
    this.props.unlikeTweet(this.props.tweet.tweetId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      tweet: {
        content,
        createdAt,
        userImage,
        username,
        fullname,
        likeCount,
        tweetId,
        commentCount,
      },
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <FavoriteBorderIcon />
      </Link>
    ) : this.likedTweet() ? (
      <span onClick={this.unlikeTweet}>
        <FavoriteIcon />
      </span>
    ) : (
      <span onClick={this.likeTweet}>
        <FavoriteBorderIcon color='primary' />
      </span>
    );
    return (
      <Fragment>
        <Card className={classes.card} elevation={0}>
          <div className={classes.info}>
            <div>
              <img className={classes.media} src={userImage} alt='profile' />
            </div>
            <div>
              <div
                style={{ marginTop: 10, cursor: "pointer" }}
                component={Link}
                to={`/user/${username}`}>
                <span
                  style={{ marginRight: 5, fontWeight: 600, color: "#fff" }}>
                  {fullname}
                </span>
                <span style={{ fontWeight: 100, color: "lightgrey" }}>
                  @{username}
                </span>
                <span style={{ fontWeight: 100, color: "lightgrey" }}>
                  &nbsp;&nbsp;.&nbsp;&nbsp;
                </span>
                <span style={{ fontWeight: 100, color: "lightgrey" }}>
                  {dayjs(createdAt).fromNow()}
                </span>
              </div>
              <div>
                <p style={{ fontSize: 14, marginRight: 10 }}>{content}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                }}>
                <div>
                  <CommentIcon fontSize='small' className={classes.icons} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    verticalAlign: "center",
                  }}>
                  <Typography variant='subtitle1' className={classes.wrapIcon}>
                    <LoopIcon fontSize='small' className={classes.icons} />
                    &nbsp;&nbsp;
                    <span style={{ color: "#fff" }}>{likeCount}</span>
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    verticalAlign: "center",
                  }}>
                  <Typography variant='subtitle1' className={classes.wrapIcon}>
                    <LikeButton fontSize='small' tweetId={tweetId} />
                    &nbsp;&nbsp;
                    <span style={{ color: "#fff" }}>{likeCount}</span>
                  </Typography>
                </div>
                <div>
                  <ShareIcon fontSize='small' className={classes.icons} />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <hr />
      </Fragment>
    );
  }
}

Tweets.propTypes = {
  classes: PropTypes.object.isRequired,
  likeTweet: PropTypes.func.isRequired,
  unlikeTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeTweet,
  unlikeTweet,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(withStyles(styles)(Tweets));
