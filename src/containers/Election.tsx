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
    created: false,
    deleted: false,
    votersAdded: false,
    candidatesAdded: false,
    partiesAdded: false,
    referendumsAdded: false
  };

  public resetError = () => this.setState({ error: {} });

  public requestStart = () =>
    this.setState({ pending: true, elections: [], election: {}, error: {} });

  public setError = error => this.setState({ error, pending: false });

  public setElection = election =>
    this.setState({ election, pending: false, updated: false, created: false });

  public updateElection = election =>
    this.setState({ election, pending: false, updated: true });

  public createElection = election =>
    this.setState({ election, pending: false, created: true });

  public reset = () =>
    this.setState({
      election: {},
      elections: [],
      error: {},
      evaluation: {},
      pending: false,
      result: {},
      uploadSuccess: false,
      created: false,
      deleted: false
    });

  public setElections = elections =>
    this.setState({
      elections,
      election: {},
      pending: false,
      created: false,
      updated: false,
      deleted: false
    });

  public abortElection = () => {
    if (this.state.created) {
      api.election
        .remove(this.state.election.id)
        .fork(this.setError, this.deleteElection);
    }
  };

  public deleteElection = deleted =>
    this.setState({ election: {}, pending: false, deleted });

  public getAll = () => {
    this.requestStart();
    return api.election.getAll().fork(this.setError, this.setElections);
  };

  public get = (id: number) => {
    this.requestStart();
    return api.election.get(id).fork(this.setError, this.setElection);
  };

  public remove = (id: number) => {
    this.requestStart();
    return api.election.remove(id).fork(this.setError, this.deleteElection);
  };

  public update = (id: number, updates: Partial<IElectionEntity>) => {
    this.requestStart();
    return api.election
      .update(id, updates)
      .fork(this.setError, this.updateElection);
  };

  public create = (updates: Partial<IElectionEntity>) => {
    this.setState({ pending: true, election: {}, created: false });
    return api.election
      .create(updates)
      .fork(this.setError, this.createElection);
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
        console.error(error);
        parameters.onError(new Error(error));
        this.setState({
          error,
          pending: false,
          uploadSuccess: false,
          votersAdded: false
        });
      },
      upload => {
        parameters.onSuccess(upload, parameters.file);
        this.setState({
          votersAdded: true,
          uploadSuccess: true,
          pending: false,
          error: {}
        });
      }
    );

    return {
      abort: cancel
    };
  };

  public addCandidates = (id: number) => (parameters: object) => {
    this.setState({
      pending: true,
      uploadSuccess: false,
      candidatesAdded: false
    });

    const cancel = api.election.addCandidates(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      upload => {
        parameters.onSuccess(upload, parameters.file);
        this.setState({
          candidatesAdded: true,
          uploadSuccess: true,
          pending: false,
          error: {}
        });
      }
    );

    return {
      abort: cancel
    };
  };

  public addParties = (id: number) => (parameters: object) => {
    this.setState({ pending: true, uploadSuccess: false, partiesAdded: false });

    const cancel = api.election.addParties(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      upload => {
        parameters.onSuccess(upload, parameters.file);
        this.setState({
          partiesAdded: true,
          uploadSuccess: true,
          pending: false,
          error: {}
        });
      }
    );

    return {
      abort: cancel
    };
  };

  public addReferendums = (id: number) => (parameters: object) => {
    this.setState({
      pending: true,
      uploadSuccess: false,
      referendumsAdded: false
    });

    const cancel = api.election.addReferendums(id, parameters).fork(
      error => {
        parameters.onError(error);
        this.setState({ error, pending: false, uploadSuccess: false });
      },
      upload => {
        parameters.onSuccess(upload, parameters.file);
        this.setState({
          referendumsAdded: true,
          uploadSuccess: true,
          pending: false,
          error: {}
        });
      }
    );

    return {
      abort: cancel
    };
  };
}

export default ElectionContainer;
