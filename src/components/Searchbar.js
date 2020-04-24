import React, { Component } from "react";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const styles = (theme) => ({
  ...theme.classes,
  search: {
    position: "relative",
    padding: "5px 20px 5px 5px",
    marginTop: 10,
    height: 22,
    borderRadius: 25,
    backgroundColor: "#161616",
    "&:hover": {
      backgroundColor: "#101010",
      border: "1px solid #1da1f2",
    },
    "&:focus": {
      backgroundColor: "#101010",
    },
    marginRight: 2,
    marginLeft: 0,
    width: "50%",
  },
  searchIcon: {
    height: "100%",
    color: "#fff",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
    marginLeft: 40,
    fontSize: 12,
  },
  inputInput: {
    padding: "1px 1px 1px 0px",
    width: "100%",
  },
});

class Searchbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search Twitter'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Searchbar);
