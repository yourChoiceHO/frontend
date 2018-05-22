import moment from "moment";
import React, { SFC } from "react";


import Header from "@/components/organisms/Header";
import PageTemplate from "@/components/templates/Page";
 import { IElectionEntity } from "@/types/model";
import { Button,Table} from "antd";

const elections: IElectionEntity[] = [
   {
    client_id: 22,
    end_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    id_election: 1,
    start_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    state: 0,
    text: "text",
    type: "Landtagswahl NRW"    
  },
  {
    client_id: 23,
    end_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    id_election: 2,
    start_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    state: 0,
    text: "text",
    type: "Landtagswahl BW"    
  },
  {
    client_id: 23,
    end_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    id_election: 3,
    start_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    state: 1,
    text: "text",
    type: "Bundestagswahl"    
  },
  {
    client_id: 23,
    end_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    id_election: 4,
    start_date: moment("20181402 18","YYYYDDMM").format("LLL"),
    state: 1,
    text: "text",
    type: "Bürgermeisterwahl"
  }

];
const columns = [{
  dataIndex: 'id_election',
  key: 'id',
  title: 'ID', 
}, {
  
  dataIndex: 'type',
  key: 'type',
  title: "Art",
}, {
  dataIndex: 'start_date',
  key: 'start_date',
  title: 'Startzeitpunkt',

},{
  dataIndex:"end_date",
  key:"end_date",
  title:"Endzeitpunkt",
},{
  dataIndex:"state",
  key:"state",
  title:"status",
},{
  dataIndex:"text",
  key:"text",
  title:"Beschreibung",
},{
  dataIndex:"client_id",
  key:"client_id",
  title:"ClientID"
},];
const ElectionOverviewPage: SFC<{}> = () => {
  return (
    <PageTemplate header={<Header />}>
      <div>Wahl Übersicht</div>


    
<Table rowKey="id" dataSource={elections} columns={columns} />
    </PageTemplate>
  )
};  

  public componentWillUnmount() {
    this.cancel();
  }


    {/* <ul>
     { elections.map(election=> {
       
     return <li key={election.id_election}>{election.id_election} {election.type}  Startzeitpunkt: {moment(election.start_date).format("LLL")} <Button>Aktivieren</Button><br/>
     Endzeitpunkt: {moment(election.end_date).format("LLL")} <Button>Bearbeiten</Button></li>
      })}

    </ul>
  
  const dataSource=[{ elections.map(election=> {
       
       return {election_id:election.id_election,type:election.type,start_date:moment(election.start_date).format("LLL"),end_date:moment(election.end_date).format("LLL"),
       text:election.text,client_id:elextion.client_id,state:election.state}
       })}
    ];

  
  
  */}