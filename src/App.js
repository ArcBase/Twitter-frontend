import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import themeFile from "./util/theme";
import "./styles/App.css";

//MaterialUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// components
import Sidebar from "./components/Sidebar";
// utilities
import AuthRoute from "./util/AuthRoute";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/actionTypes";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//pages
import Home from "./pages/home";
import Explore from "./pages/explore";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Bookmarks from "./pages/bookmarks";
import Lists from "./pages/lists";
import Messages from "./pages/messages";
import Notifications from "./pages/notifications";

const theme = createMuiTheme(themeFile);
axios.defaults.baseURL =
  "https://europe-west2-twitter-8c876.cloudfunctions.net/api";

const token = localStorage.Token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const styles = (theme) => ({
  ...theme.classes,
});

class App extends Component {
  render() {
    return (
      <div className='App'>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Fragment>
              <Router>
                <Switch>
                  <Fragment>
                    <Grid container>
                      <Grid
                        item
                        sm={4}
                        md={4}
                        lg={3}
                        xs={2}
                        className='sidebarDiv'>
                        <Sidebar />
                      </Grid>
                      <Grid item sm={8} xs={10}>
                        <>
                          <AuthRoute
                            exact
                            path='/explore'
                            component={Explore}
                          />
                          <Route exact path='/' component={Home} />
                          <AuthRoute exact path='/login' component={Login} />
                          <AuthRoute exact path='/signup' component={Signup} />
                          <Route exact path='/settings' component={Settings} />
                          <Route exact path='/profile' component={Profile} />
                          <Route
                            exact
                            path='/bookmarks'
                            component={Bookmarks}
                          />
                          <Route exact path='/lists' component={Lists} />
                          <Route exact path='/messsages' component={Messages} />
                          <Route
                            exact
                            path='/notifications'
                            component={Notifications}
                          />
                          {/* <Route exact path='/users/:handle' component={user} />
                          <Route
                            exact
                            path='/users/:handle/scream/:screamId'
                            component={user}
                          /> */}
                        </>
                      </Grid>
                    </Grid>
                  </Fragment>
                </Switch>
              </Router>
            </Fragment>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
