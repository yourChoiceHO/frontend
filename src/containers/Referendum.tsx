import Container from "@/containers/Container";
import api from "@/lib/api";
import { IReferendumContext } from "@/types/context";

class ReferendumContainer extends Container<IReferendumContext> {
  public state: IReferendumContext = {
    error: {},
    pending: false,
    referendums: []
  };

  public getByElection = (id: number) => {
    return api.referendum
      .getByElection(id)
      .fork(
        error => this.setState({ error, pending: false }),
        referendums => this.setState({ error: {}, pending: false, referendums })
      );
  };
}

export default ReferendumContainer;
