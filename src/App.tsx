import React, { SFC } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "unstated";

import ElectionNewPage from "@/components/pages/election/Create";
import ElectionDetailPage from "@/components/pages/election/Detail";
import ElectionEditPage from "@/components/pages/election/Edit";
import ElectionEvaluatePage from "@/components/pages/election/Evaluate";
import ElectionOverviewPage from "@/components/pages/election/Overview";
import ElectionDeletePage from "@/components/pages/election/Remove";
import ElectionVotePage from "@/components/pages/election/Vote";

import HelpPage from "@/components/pages/Help";
import ImprintPage from "@/components/pages/Imprint";
import NotFoundPage from "@/components/pages/NotFound";
import TermsPage from "@/components/pages/Terms";
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

        <Route exact={true} path="/wahl" component={ElectionOverviewPage} />
        <Route path="/wahl/neu" component={ElectionNewPage} />
        <Route path="/wahl/detail" component={ElectionDetailPage} />
        <Route path="/wahl/bearbeiten" component={ElectionEditPage} />
        <Route path="/wahl/auswerten" component={ElectionEvaluatePage} />
        <Route path="/wahl/entfernen" component={ElectionDeletePage} />
        <Route path="/wahl/wählen" component={ElectionVotePage} />

        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default hot(module)(App);
