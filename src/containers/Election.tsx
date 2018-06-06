import Container from "@/containers/Container";
import api from "@/lib/api";
import { IElectionsContext } from "@/types/context";
import { IElectionEntity } from "@/types/model";

class ElectionContainer extends Container<IElectionsContext> {
  public state: IElectionsContext = {
    election: {},
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

  public get = (id: number) => {
    return api.election
      .get(id)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };

  public remove = (id: number) => {
    return api.election
      .remove(id)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };

  public update = (id: number, updates: Partial<IElectionEntity>) => {
    return api.election
      .update(id, updates)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };
}

export default ElectionContainer;
