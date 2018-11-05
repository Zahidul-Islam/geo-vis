import React, { Component } from "react";
// import { connect } from "react-redux";
import SignUpView from "./SignUpView";
import { withRouter } from "react-router";
import app from "../base";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      // this.props.history.push("/login");
      this.context.router.transitionTo("/login");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);

// const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => ({ dispatch });

// export default withRouter(connect(mapStateToProps))(SignUpContainer);
