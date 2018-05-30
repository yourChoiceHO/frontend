import { Icon, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { Cancel } from "fluture";
import moment from "moment";
import { isEmpty, pathOr } from "ramda";
import React, { Component, Fragment } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { IElectionEntity } from "@/types/model";
import { noop } from "@/utils";

class ElectionOverview extends Component<
  RouteComponentProps<{}> & { election: ElectionContainer }
> {
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.getAll();
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public render() {
    const elections = pathOr({}, ["state", "elections"], this.props.election);
    // const pending = pathOr({}, ["state", "pending"], this.props.election);

    if (isEmpty(elections)) {
      return "Wahl wurde nicht gefunden";
    }

    return (
      <Table
        rowKey="id_election"
        dataSource={elections}
        columns={this.getColumns()}
      />
    );
  }

  private renderDateRow = (text: string, record: IElectionEntity) =>
    moment(text).format("MMMM Do YYYY, h:mm:ss a");

  private renderActionsRow = (text: string, record: IElectionEntity) => {
    const uri = `${this.props.match.path}/${record.id_election}`;

    return (
      <Fragment>
        <Link to={uri}>
          <Icon type="search" />
        </Link>
        <Link to={`${uri}/bearbeiten`}>
          <Icon type="edit" />
        </Link>
        <Link to={`${uri}/entfernen`}>
          <Icon type="delete" />
        </Link>
        <Link to={`${uri}/auswerten`}>
          <Icon type="area-chart" />
        </Link>
        <Link to={`${uri}/wählen`}>
          <Icon type="form" />
        </Link>
      </Fragment>
    );
  };

  private getColumns: () => Array<ColumnProps<IElectionEntity>> = () => [
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
      render: this.renderDateRow,
      title: "Startzeitpunkt"
    },
    {
      dataIndex: "end_date",
      key: "end_date",
      render: this.renderDateRow,
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
      key: "action",
      render: this.renderActionsRow,
      title: "Aktion"
    }
  ];
}

export default connect({
  election: ElectionContainer
})(ElectionOverview);
