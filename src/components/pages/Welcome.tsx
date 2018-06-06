import React, { SFC } from "react";
import { Redirect } from "react-router-dom";

const WelcomePage: SFC<{}> = () => <Redirect to="/wähler/anmelden" />;

export default WelcomePage;
