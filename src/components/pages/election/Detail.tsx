import { DatePicker, Tag } from "antd";
import { Cancel } from "fluture";
import { isEmpty, length, pathOr } from "ramda";
import React, { Component, Fragment } from "react";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import ReferendumContainer from "@/containers/Referendum";
import { ElectionStates, ElectionTypes } from "@/types/model";
import { noop, reduceWithOr } from "@/utils";

import moment from "@/utils/date";

const dateTimeFormat = "DD.MM.YYYY [·] HH:mm:ss [Uhr]";

class ElectionDetail extends Component<{ election: ElectionContainer }> {
  private cancelElection: Cancel = noop;
  private cancelMetadata: Cancel = noop;
  private cancelReferendums: Cancel = noop;

  public componentDidMount() {
    this.cancelElection = this.props.election.get(
      this.props.computedMatch.params.id
    );
    this.cancelMetadata = this.props.election.getByConstituencies(
      this.props.computedMatch.params.id
    );
    this.cancelReferendums = this.props.referendums.getByElection(
      this.props.computedMatch.params.id
    );
  }

  public componentWillUnmount() {
    this.cancelElection();
    this.cancelMetadata();
    this.cancelReferendums();
  }

  public render() {
    const question = pathOr(
      "",
      ["state", "referendums", 0, "text"],
      this.props.referendums
    );

    const election = pathOr({}, ["state", "election"], this.props.election);
    const pending = pathOr({}, ["state", "pending"], this.props.election);
    const type = election.typ;

    const metadata = pathOr({}, ["state", "metadata"], this.props.election);

    const voters = pathOr([], ["voter"], metadata);
    const parties = pathOr([], ["party"], metadata);
    const candidates = pathOr([], ["candidates"], metadata);

    const isEuropawahl = type === ElectionTypes.Europawahl;
    const isBundestagswahl = type === ElectionTypes.Bundestagswahl;
    const isLandtagswahl = type === ElectionTypes.Landtagswahl;
    const isBuergermeisterwahl = type === ElectionTypes.Buergermeisterwahl;
    const isReferendum = type === ElectionTypes.Referendum;
    const isKommunalwahl = type === ElectionTypes.Kommunalwahl;
    const isLandtagswahlBW = type === ElectionTypes.LandtagswahlBW;
    const isLandtagswahlSL = type === ElectionTypes.LandtagswahlSL;

    const showPartyList = reduceWithOr([
      isEuropawahl,
      isBundestagswahl,
      isLandtagswahl,
      isLandtagswahlSL
    ]);

    const showCandidateList = reduceWithOr([
      isBundestagswahl,
      isLandtagswahl,
      isKommunalwahl,
      isBuergermeisterwahl,
      isLandtagswahlBW
    ]);

    if (pending) {
      return "";
    }

    if (isEmpty(election)) {
      return <div />;
    }

    return (
      <Fragment>
        <h2>
          #{election.id_election} {election.typ}
        </h2>
        <p>Beschreibung: {election.text}</p>
        <p>
          Wahl ID: <Tag color="#108ee9">{election.id_election}</Tag>
        </p>
        <p>
          Client ID: <Tag color="#108ee9">{election.client_id}</Tag>
        </p>
        <p>
          Zustand: <Tag color="#87d068">{ElectionStates[election.state]}</Tag>
        </p>
        <p>
          Start:{" "}
          <DatePicker
            format={dateTimeFormat}
            defaultValue={moment(election.start_date)}
            disabled={true}
          />
        </p>
        <p>
          Ende:{" "}
          <DatePicker
            format={dateTimeFormat}
            defaultValue={moment(election.end_date)}
            disabled={true}
          />
        </p>
        {isReferendum && <p>Frage: {question}</p>}
        <p>
          Anzahl Wähler: <Tag color="#108ee9">{length(voters)}</Tag>
        </p>
        {showPartyList && (
          <p>
            Anzahl Parteien: <Tag color="#108ee9">{length(parties)}</Tag>
          </p>
        )}
        {showCandidateList && (
          <p>
            Anzahl Kandidaten: <Tag color="#108ee9">{length(candidates)}</Tag>
          </p>
        )}
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer,
  referendums: ReferendumContainer
})(ElectionDetail);
