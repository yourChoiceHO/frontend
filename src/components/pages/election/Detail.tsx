import moment from "moment";    

import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

import { IElectionEntity } from "@/types/model";   

const election: IElectionEntity = {
  client_id: 2,
  end_date: moment("07062018", "DDMMYYYY"), 
  id_election: 1,
  start_date: moment(), 
  state: 7,
  text: "Sampletext Sampletext Sampletext Sampletext Sampletext Sampletext", 
  type: "Bundestagswahl"
};

const ElectionDetailPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Details zur {election.type} </div>

      <li> {election.text} </li>
      <li>Wahl ID: {election.id_election} </li>
      <li>Client ID: {election.client_id} </li>
      <li>Zustand: {election.state} </li>
      <li>startet am: {election.start_date.format("LLL")} </li>
      <li>endet am: {election.end_date.format("LLL")} </li>
    </PageTemplate>
  );
};

export default ElectionDetailPage;
