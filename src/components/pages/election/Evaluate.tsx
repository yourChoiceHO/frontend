import React, { SFC } from "react";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
import { Bar, Doughnut } from "react-chartjs-2";

import { Button, Radio } from "antd";

import { IPartyEntity } from "@/types/model";

const parties: IPartyEntity[] = [
  {
    id_party: 1,
    name: "AFD",
    text: "Alternative für Deutschland",
    consituency: 2,
    election_id: 3,
    vote: 1
  },
  {
    id_party: 2,
    name: "CDU/CSU",
    text: "Christlich Demokratische u. Christlich-Soziale Union Deutschlands",
    consituency: 4,
    election_id: 2,
    vote: 0
  },
  {
    id_party: 3,
    name: "SPD",
    text: "Sozialdemokratische Partei Deutschlands",
    consituency: 4,
    election_id: 2,
    vote: 0
  },
  {
    id_party: 4,
    name: "FDP",
    text: "Freie Demokratische Partei",
    consituency: 4,
    election_id: 2,
    vote: 0
  }
];

const data = {
  datasets: [
    {
      backgroundColor: [
        "rgba(255,0,0, 0.4)",
        "rgba(208,32,144, 0.4)",
        "rgba(238, 180, 34, 0.4)",
        "rgba(0, 205, 255, 0.4)",
        "rgba(255,99,71, 0.4)",
        "rgba(34, 139, 34, 0.4)"
      ],
      borderColor: [
        "rgba(255,0,0,1)",
        "rgba(208,32,144, 1)",
        "rgba(238, 180, 34, 1)",
        "rgba(0, 205, 255, 1)",
        "rgba(255,99,71, 1)",
        "rgba(34, 139, 34, 1)"
      ],
      borderWidth: 2,
      data: [20.5, 26.8, 10.7, 12.6, 9.2, 8.9],
      label: "Prozentualer Anteil der Stimmen pro Partei"
    }
  ],
  labels: ["SPD", "CDU / CSU", "FDP", "AfD", "Die Linke", "Die Grünen"]
};

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

const doughnut = <Doughnut data={data} options={options} />;
const bar = <Bar data={data} options={options} />;

class ElectionEvaluatePage extends React.Component {
  public state = {
    diagram: doughnut
  };

  public handleDiagramChange = e => {
    this.setState({ diagram: e.target.value });
  };

  public render() {
    return (
      <PageTemplate header={<Header />}>
        <div>Wahl Auswertung</div>
        <Radio.Group onChange={this.handleDiagramChange}>
          <Radio.Button value={doughnut}> Kuchen-Diagramm </Radio.Button>
          <Radio.Button value={bar}>Balken-Diagramm</Radio.Button>
        </Radio.Group>
        <div>{this.state.diagram}</div>
      </PageTemplate>
    );
  }
}

export default ElectionEvaluatePage;
