import Container from "@/containers/Container";
import api from "@/lib/api";
import { IPartyContext } from "@/types/context";

class PartyContainer extends Container<IPartyContext> {
  public state: IPartyContext = {
    error: {},
    parties: [],
    pending: false
  };

  public getByElection = (id: number) => {
    return api.party
      .getByElection(id)
      .fork(
        error => this.setState({ error, pending: false }),
        parties => this.setState({ error: {}, parties, pending: false })
      );
  };
}

export default PartyContainer;
