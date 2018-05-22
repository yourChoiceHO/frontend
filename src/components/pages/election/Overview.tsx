import { Cancel } from "fluture";
import { isEmpty, pathOr } from "ramda";
import React, { Component } from "react";

import ElectionContainer, { withElection } from "@/containers/Election";

import { Table } from "antd";

const columns = [
  {
    dataIndex: "id_election",
    key: "id",
    title: "ID"
  },
  {
    dataIndex: "type",
    key: "type",
    title: "Art"
  },
  {
    dataIndex: "start_date",
    key: "start_date",
    title: "Startzeitpunkt"
  },
  {
    dataIndex: "end_date",
    key: "end_date",
    title: "Endzeitpunkt"
  },
  {
    dataIndex: "state",
    key: "state",
    title: "status"
  },
  {
    dataIndex: "text",
    key: "text",
    title: "Beschreibung"
  },
  {
    dataIndex: "client_id",
    key: "client_id",
    title: "ClientID"
  }
];

class ElectionOverview extends Component<{ election: ElectionContainer }> {
  public componentDidMount() {
    this.cancel = this.props.election.getAll();
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    const elections = pathOr({}, ["state", "elections"], this.props.election);

    if (isEmpty(elections)) {
      return <div />;
    }

    return <Table rowKey="id" dataSource={elections} columns={columns} />;
  }

  private cancel: Cancel = () => {};
}

export default withElection(ElectionOverview);
