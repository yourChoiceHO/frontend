import { Button } from "antd";
import React, { SFC } from "react";
import { Link, Redirect, RouteComponentProps, Switch } from "react-router-dom";

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

const ElectionPage: SFC<RouteComponentProps<{}>> = ({ match }) => (
  <PageTemplate header={<Header />}>
    {!match.isExact && (
      <Link to={match.path}>
        <Button type="primary">Zurück</Button>
      </Link>
    )}
    <Switch>
      <ProtectedRoute
        exact={true}
        path="/wahl"
        component={ElectionOverview}
        redirectProps={{ to: "/wähler/anmelden" }}
        roles={[Role.Voter, Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/erstellen"
        component={ElectionNew}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        exact={true}
        path="/wahl/:id"
        component={ElectionDetail}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/detail"
        component={ElectionDetail}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/bearbeiten"
        component={ElectionEdit}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/entfernen"
        component={ElectionDelete}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor, Role.Moderator]}
      />

      <ProtectedRoute
        path="/wahl/:id/auswerten"
        component={ElectionEvaluate}
        redirectProps={{ to: "/mitarbeiter/anmelden" }}
        roles={[Role.Supervisor]}
      />

      <ProtectedRoute
        path="/wahl/:id/wählen"
        component={ElectionVote}
        redirectProps={{ to: "/wähler/anmelden" }}
        roles={[Role.Voter, Role.Supervisor]}
      />

      <Redirect to="/seite-nicht-gefunden" />
    </Switch>
  </PageTemplate>
);

export default ElectionPage;
