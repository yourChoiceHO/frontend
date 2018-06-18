import Container from "@/containers/Container";
import api from "@/lib/api";
import { IElectionsContext } from "@/types/context";
import { IElectionEntity, IElectionVote } from "@/types/model";

class ElectionContainer extends Container<IElectionsContext> {
  public state: IElectionsContext = {
    election: {},
    elections: [],
    error: {},
    evaluation: {},
    pending: false,
    result: {},
    uploadSuccess: false,
    created: false
  };

  public getAll = () => {
    this.setState({ pending: true, elections: [] });
    return api.election
      .getAll()
      .fork(
        error => this.setState({ error, pending: false }),
        elections => this.setState({ elections, pending: false, error: {} })
      );
  };

  public get = (id: number) => {
    this.setState({ pending: true, election: {} });
    return api.election
      .get(id)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };

  public remove = (id: number) => {
    this.setState({ pending: true });
    return api.election
      .remove(id)
      .fork(
        error => this.setState({ error, pending: false }),
        election => this.setState({ election, pending: false, error: {} })
      );
  };

  public update = (id: number, updates: Partial<IElectionEntity>) => {
    this.setState({ pending: true, updated: false });
    return api.election
      .update(id, updates)
      .fork(
        error => this.setState({ error, pending: false }),
        election =>
          this.setState({ election, pending: false, error: {}, updated: true })
      );
  };

  public create = (updates: Partial<IElectionEntity>) => {
    this.setState({ pending: true, election: {}, created: false });
    return api.election
      .create(updates)
      .fork(
        error => this.setState({ error, pending: false }),
        election =>
          this.setState({ election, pending: false, error: {}, created: true })
      );
  };

  public evaluate = (id: number) => {
    this.setState({ pending: true, evaluation: {} });
    return api.election
      .evaluate(id)
      .fork(
        error => this.setState({ error, pending: false }),
        evaluation => this.setState({ evaluation, pending: false, error: {} })
      );
  };

  public vote = (id: number, electionVote: IElectionVote) => {
    this.setState({ pending: true, result: {} });
    return api.election
      .vote(id, electionVote)
      .fork(
        error => this.setState({ error, pending: false }),
        result => this.setState({ result, pending: false, error: {} })
      );
  };

  public addVoters = (id: number) => (parameters: object) => {
    this.setState({ pending: true, uploadSuccess: false });

    const cancel = api.election.addVoters(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      uploadSuccess => {
        parameters.onSuccess(uploadSuccess, parameters.file);
        this.setState({ uploadSuccess: true, pending: false, error: {} });
      }
    );

    return {
      abort: cancel
    };
  };

  public addCandidates = (id: number) => (parameters: object) => {
    this.setState({ pending: true, uploadSuccess: false });

    const cancel = api.election.addCandidates(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      uploadSuccess => {
        parameters.onSuccess(uploadSuccess, parameters.file);
        this.setState({ uploadSuccess: true, pending: false, error: {} });
      }
    );

    return {
      abort: cancel
    };
  };

  public addParties = (id: number) => (parameters: object) => {
    this.setState({ pending: true, uploadSuccess: false });

    const cancel = api.election.addParties(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      uploadSuccess => {
        parameters.onSuccess(uploadSuccess, parameters.file);
        this.setState({ uploadSuccess: true, pending: false, error: {} });
      }
    );

    return {
      abort: cancel
    };
  };

  public addReferendums = (id: number) => (parameters: object) => {
    this.setState({ pending: true, uploadSuccess: false });

    const cancel = api.election.addReferendums(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      uploadSuccess => {
        parameters.onSuccess(uploadSuccess, parameters.file);
        this.setState({ uploadSuccess: true, pending: false, error: {} });
      }
    );

    return {
      abort: cancel
    };
  };
}

export default ElectionContainer;
