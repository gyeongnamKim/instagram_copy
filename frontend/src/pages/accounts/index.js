import React from "react";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";

function Routes() {
  return (
    <>
      <Route exact path="/accounts/profile" component={Profile} />
      <Route exact path="/accounts/login" component={Login} />
    </>
  );
}

export default Routes;
