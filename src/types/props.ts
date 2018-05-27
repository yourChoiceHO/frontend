import { EventHandler, FormEvent } from "react";

import { IElectionEntity } from "@/types/model";

export interface IVoteProps {
  election: IElectionEntity;
  onSubmit: EventHandler<FormEvent<HTMLFormElement>>;
}
