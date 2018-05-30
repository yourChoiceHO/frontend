import React, { SFC } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "unstated";

import ElectionPage from "@/components/pages/election";
import HelpPage from "@/components/pages/Help";
import ImprintPage from "@/components/pages/Imprint";
import NotFoundPage from "@/components/pages/NotFound";
import TermsPage from "@/components/pages/Terms";
import UserLoginPage from "@/components/pages/user/Login";
import VoterLoginPage from "@/components/pages/voter/Login";
import WelcomePage from "@/components/pages/Welcome";

import "../node_modules/antd/dist/antd.less";
import "./styles/base.less";

const App: SFC<{}> = () => (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={WelcomePage} />
        <Route path="/hilfe" component={HelpPage} />
        <Route path="/impressum" component={ImprintPage} />
        <Route path="/bedingungen/:tab?" component={TermsPage} />

        <Route path="/wähler/anmelden" component={VoterLoginPage} />
        <Route path="/mitarbeiter/anmelden" component={UserLoginPage} />

        <Route path="/wahl" component={ElectionPage} />

        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default hot(module)(App);
