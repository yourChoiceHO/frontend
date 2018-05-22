import React, { SFC } from "react";
import { Redirect, Switch } from "react-router-dom";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

import ProtectedRoute from "@/components/molecules/ProtectedRoute";

import ElectionNew from "@/components/pages/election/Create";
import ElectionDetail from "@/components/pages/election/Detail";
import ElectionEdit from "@/components/pages/election/Edit";
import ElectionEvaluate from "@/components/pages/election/Evaluate";
import ElectionOverview from "@/components/pages/election/Overview";
import ElectionDelete from "@/components/pages/election/Remove";
import ElectionVote from "@/components/pages/election/Vote";

import { Role } from "@/types/model";

const ElectionPage: SFC<{}> = () => (
  <PageTemplate header={<Header />}>
    <Switch>
      <ProtectedRoute
        exact={true}
        path="/wahl"
        component={ElectionOverview}
        redirectProps={{ to: "/wähler/anmeldung" }}
        roles={[Role.Voter, Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/neu"
        component={ElectionNew}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        exact={true}
        path="/wahl/:id"
        component={ElectionDetail}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/detail"
        component={ElectionDetail}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/bearbeiten"
        component={ElectionEdit}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/entfernen"
        component={ElectionDelete}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/auswerten"
        component={ElectionEvaluate}
        redirectProps={{ to: "/mitarbeiter/anmeldung" }}
        roles={[Role.Supervisor]}
      />

      <ProtectedRoute
        path="/wahl/:id/wählen"
        component={ElectionVote}
        redirectProps={{ to: "/wähler/anmeldung" }}
        roles={[Role.Voter]}
      />

      <Redirect to="/seite-nicht-gefunden" />
    </Switch>
  </PageTemplate>
);

export default ElectionPage;
