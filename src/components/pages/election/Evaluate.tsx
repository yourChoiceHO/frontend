import { Button } from "antd";
import { Cancel } from "fluture";
import { concat, isEmpty, join, map, pathOr, pluck, prop } from "ramda";
import React, { Component, Fragment } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import connect from "@/containers/connect";
import ElectionContainer from "@/containers/Election";
import { ElectionTypes, IElectionEntity, IEvaluation } from "@/types/model";

import { getRandomColor, noop } from "@/utils";
import moment from "@/utils/date";

const options = {};

const createFilename = ({ client_id, id_election, typ, end_date }) => {
  const date = moment(end_date).format("X");
  const name = join("_", [date, id_election, client_id, typ]);
  const filename = concat(name, ".json");

  return filename;
};

const objToJsonBlob = data => {
  const parts = JSON.stringify(
    data,
    null,
    process.env.DEBUG === "yes" ? "\t" : ""
  );

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
    const id = this.props.computedMatch.params.id;
    this.cancel = this.props.election.evaluate(id);
  }

  public componentWillUnmount() {
    this.cancel();
  }

  public renderParties(parties) {
    const data = pluck<string, number>("vote_percent", parties);
    const labels = pluck<string, string>("name", parties);
    const backgroundColor = data.map(() => getRandomColor());

    const chartData = {
      datasets: [{ backgroundColor, data }],
      labels
    };

    return (
      <Doughnut
        width={100}
        height={50}
        key="parties_chart"
        data={chartData}
        options={options}
      />
    );
  }

  public renderCandidates(candidates) {
    const data = pluck<string, number>("vote_percent", candidates);
    const labels = map(({ first_name, last_name }) => `${last_name}, ${first_name}`, candidates);
    const backgroundColor = data.map(() => getRandomColor());

    const chartData = {
      datasets: [{ backgroundColor, data }],
      labels
    };

    return (
      <Bar
        width={100}
        height={50}
        key="candidates_chart"
        data={chartData}
        options={options}
      />
    );
  }

  public renderText(text) {
    return <h3 key="question">{text}</h3>;
  }

  public renderYesNo({ yes, no }) {
    const data = [prop("percent", yes), prop("percent", no)];
    const labels = ["Ja", "Nein"];
    const backgroundColor = data.map(() => getRandomColor());

    const chartData = {
      datasets: [{ backgroundColor, data }],
      labels
    };

    return (
      <Doughnut
        width={100}
        height={50}
        key="yes_no_chart"
        data={chartData}
        options={options}
      />
    );
  }

  public render() {
    const state = this.props.election.state;

    const pending = pathOr({}, ["pending"], state);
    const evaluation = pathOr<IEvaluation>({}, ["evaluation"], state);

    const constituency = pathOr({}, ["constituency", 1], evaluation);
    const general = pathOr({}, ["general"], evaluation);

    const election = pathOr<IElectionEntity>({}, ["election"], general);

    const parties = pathOr([], ["parties"], general);
    const candidates = pathOr([], ["candidates"], general);

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
