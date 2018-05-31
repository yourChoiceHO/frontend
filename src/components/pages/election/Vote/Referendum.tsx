import React, { SFC } from "react";

import { IElectionEntity } from "@/types/model";
import { IVoteProps } from "@/types/props";
import { Button, Checkbox, Col, Radio, Row } from 'antd';
import moment from 'moment';

const election: IElectionEntity = {
  client_id: 1,
  end_date: moment("2014-05-25"),
  id_election: 1,
  start_date: moment("2014-05-20"),
  state: 2,
  text: "Stadt Offenburg",
  type: "Referendum"
};
const Referendum: SFC<IVoteProps> = () => {

  return (
    <div >

      <h2>Interaktiver Stimmzettel
          das Referendum
          am {election.end_date.format("DD.MM.YYYY")} in der {election.text}
      </h2 >
      <div>
        <Row >
          <Radio.Group id="radiovote">
            <Radio value={1}>Ja</Radio>
            <Radio value={2}>Nein</Radio>
          </Radio.Group>
        </Row>
        <Row>
          <Checkbox>Stimme ungültig machen.</Checkbox>
        </Row>
        <Row>
          <Col>
            <Button type="primary" >Stimme abgeben!</Button>
          </Col>
        </Row>
      </div>

    </div >
  );
};

export default Referendum;
