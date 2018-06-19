import { Button } from "antd";
import { Cancel } from "fluture";
import moment from "moment";
import {
  concat,
  compose,
  filter,
  is,
  isEmpty,
  map,
  pathOr,
  range,
  unary,
  join
} from "ramda";
import React, { Component, Fragment } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { ElectionTypes, IElectionEntity, IEvaluation } from "@/types/model";
import { noop } from "@/utils";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          autoSkip: false,
          beginAtZero: true,
          stepSize: 1
        }
      }
    ]
  }
};

const getRandomColor = () => `#${(~~(Math.random() * (1 << 24))).toString(16)}`;

const listifyResultEntities = compose(
  filter(is(Object)),
  unary(Object.values)
);

const createFilename = ({ client_id, id_election, typ, end_date }) => {
  const date = moment(end_date).format("X");
  const name = join("_", [date, id_election, client_id, typ]);
  const filename = concat(name, ".json");

  return filename;
};

const objToJsonBlob = data => {
  const parts = JSON.stringify(data);
  const type = "application/json;charset=utf-8";
  const blob = new Blob([parts], { type });

  return blob;
};

const createDownloadLink = (filename, blob) => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  return link;
};

const exportAsJson = (evaluation, election) => () => {
  const filename = createFilename(election);
  const blob = objToJsonBlob(evaluation);
  const link = createDownloadLink(filename, blob);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

class ElectionEvaluate extends Component<{ election: ElectionContainer }> {
  private cancel: Cancel = noop;

  public componentDidMount() {
    this.cancel = this.props.election.evaluate(
      this.props.computedMatch.params.id
    );
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public renderParties(parties) {
    console.log({ parties });

    const filtered = listifyResultEntities(parties);
    const length = filtered.length;

    const partiesData = map(
      ({ vote_percent }) => parseFloat(vote_percent),
      filtered
    );

    const partiesLabel = map(({ name }) => name, filtered);

    const data = {
      datasets: [
        {
          backgroundColor: range(1, length).map(() => getRandomColor()),
          data: partiesData
        }
      ],
      labels: partiesLabel
    };

    return <Doughnut key="parties_chart" data={data} options={options} />;
  }

  public renderCandidates(candidates) {
    console.log({ candidates });

    const filtered = listifyResultEntities(candidates);
    const length = filtered.length;

    const candidatesData = map(
      ({ vote_percent }) => parseFloat(vote_percent),
      filtered
    );

    const candidatesLabel = map(
      ({ first_name, last_name }) => `${last_name}, ${first_name}`,
      filtered
    );

    const data = {
      datasets: [
        {
          backgroundColor: range(1, length).map(() => getRandomColor()),
          data: candidatesData
        }
      ],
      labels: candidatesLabel
    };

    return <Bar key="candidates_chart" data={data} options={options} />;
  }

  public renderText(text) {
    console.log(text);
    return "";
  }

  public renderYesNo({ yes, no }) {
    console.log({ yes, no });
    return "";
  }

  public render() {
    const state = this.props.election.state;

    const pending = pathOr({}, ["pending"], state);
    const evaluation = pathOr<IEvaluation>({}, ["evaluation"], state);

    const constituency = pathOr({}, ["constituency", 1], evaluation);
    const general = pathOr({}, ["general"], evaluation);

    const election = pathOr<IElectionEntity>({}, ["election"], general);

    const parties = pathOr([], ["parties"], constituency);
    const candidates = pathOr([], ["candidate"], constituency);

    const text = pathOr("", ["text"], general);
    const yesCount = pathOr(0, ["yes", "vote_number"], general);
    const yesPercent = pathOr(0, ["yes", "vote_percent"], general);
    const noCount = pathOr(0, ["no", "vote_number"], general);
    const noPercent = pathOr(0, ["no", "vote_percent"], general);

    if (pending) {
      return "";
    }

    if (isEmpty(evaluation)) {
      return <p>Keine Ergebnisse vorhanden.</p>;
    }

    return (
      <Fragment>
        <h2>Ergebnisse der {election.typ}</h2>
        <h3>{election.start_date}</h3>
        <Button type="primary" onClick={exportAsJson(evaluation, election)}>
          Ergebnisse exportieren
        </Button>
        {(type => {
          if (
            type === ElectionTypes.Bundestagswahl ||
            type === ElectionTypes.Landtagswahl
          ) {
            return [
              this.renderParties(parties),
              this.renderCandidates(candidates)
            ];
          } else if (
            type === ElectionTypes.Buergermeisterwahl ||
            type === ElectionTypes.Europawahl ||
            type === ElectionTypes.LandtagswahlBW
          ) {
            return [this.renderCandidates(candidates)];
          } else if (type === ElectionTypes.LandtagswahlSL) {
            return [this.renderParties(parties)];
          } else if (type === ElectionTypes.Referendum) {
            return [
              this.renderText(text),
              this.renderYesNo({
                no: { count: noCount, percent: noPercent },
                yes: { count: yesCount, percent: yesPercent }
              })
            ];
          } else {
            return <div />;
          }
        })(election.typ)}
      </Fragment>
    );
  }
}

export default connect({
  election: ElectionContainer
})(ElectionEvaluate);
