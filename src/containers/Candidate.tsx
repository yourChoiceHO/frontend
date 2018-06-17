import Container from "@/containers/Container";
import api from "@/lib/api";
import { ICandidateContext } from "@/types/context";

class CandidateContainer extends Container<ICandidateContext> {
  public state: ICandidateContext = {
    candidates: [],
    error: {},
    pending: false
  };

  public getByElection = (id: number) => {
    this.setState({ pending: true, candidates: [] });
    return api.candidate
      .getByElection(id)
      .fork(
        error => this.setState({ error, pending: false }),
        candidates => this.setState({ candidates, error: {}, pending: false })
      );
  };
}

export default CandidateContainer;
