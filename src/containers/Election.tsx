import Container from "@/containers/Container";
import api from "@/lib/api";
import { IElectionsContext } from "@/types/context";

class ElectionContainer extends Container<IElectionsContext> {
  public state: IElectionsContext = {
    elections: [],
    error: {},
    pending: false
  };

  public getAll = () => {
    this.setState({ pending: true });
    return api.election
      .getAll()
      .fork(
        error => this.setState({ error, pending: false }),
        elections => this.setState({ elections, pending: false, error: {} })
      );
  };
}

export default ElectionContainer;
