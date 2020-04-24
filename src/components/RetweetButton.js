import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Icons
import LoopIcon from "@material-ui/icons/Loop";

//REDUX
import { connect } from "react-redux";
import { retweet, undoRetweet } from "../redux/actions/dataActions";

class RetweetButton extends Component {
  retweeted = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.tweetId === this.props.tweetId)
    )
      return true;
    else return false;
  };
  retweet = () => {
    this.props.retweet(this.props.tweetId);
  };
  undoRetweet = () => {
    this.props.undoRetweet(this.props.tweetId);
  };
  render() {
    const { authenticated } = this.props.user;
    const retweetButton = !authenticated ? (
      <Link to='/login'>
        <span>
          <LoopIcon
            style={{ color: "lightgray", cursor: "pointer" }}
            fontSize='small'
          />
        </span>
      </Link>
    ) : this.retweeted() ? (
      <span onClick={this.undoRetweet}>
        <LoopIcon
          style={{ color: "green", cursor: "pointer" }}
          fontSize='small'
        />
      </span>
    ) : (
      <span onClick={this.retweet}>
        <LoopIcon
          style={{ color: "lightgray", cursor: "pointer" }}
          fontSize='small'
        />
      </span>
    );
    return retweetButton;
  }
}

RetweetButton.propTypes = {
  user: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  retweet: PropTypes.func.isRequired,
  undoRetweet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  retweet,
  undoRetweet,
};

export default connect(mapStateToProps, mapActionsToProps)(RetweetButton);
