import React, { Component } from "react";
import App from "./app";
import { Provider } from "react-redux";
import { browserHistory, Router, Route } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { render } from "react-dom";
import store from "./store";
// import PrivateRoute from "./PrivateRoute";

// import Login from "./LogIn";
// import SignUp from "./SignUp";
import firebase from "./base";

//import history from "./history";
//import Auth from "./auth";
// import Callback from "./callback";

import * as serviceWorker from "./serviceWorker";

const history = syncHistoryWithStore(browserHistory, store);

// const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//   console.log("===========");
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// };

class Root extends Component {
  state = { loading: true, authenticated: false, user: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    // const { authenticated, loading } = this.state;

    // if (loading) {
    //   return <p>Loading..</p>;
    // }

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" component={App} />
            {/* <PrivateRoute
              exact
              path="/"
              component={App}
              authenticated={authenticated}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} history={history} /> */}
            {/* <Route
          path="/callback"
          render={({ history }) => {
            auth.extractAndSaveUserToken(
              () => {
                history.push("/");
              },
              () => history.push("/authError")
            );
            return <div>Loading</div>;
          }}
          // render={props => {
          //   console.log("----> callback");
          //   handleAuthentication(props);
          //   return <Callback {...props} />;
          // }}
        /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement("div")));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
