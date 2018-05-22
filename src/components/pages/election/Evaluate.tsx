import { Radio } from "antd";
import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";

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

class ElectionEvaluate extends Component {
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

export default ElectionEvaluate;
