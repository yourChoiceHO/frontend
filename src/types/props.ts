import { FormComponentProps, ValidateCallback } from "antd/lib/form";
import { EventHandler, FormEvent } from "react";

import { IElectionEntity } from "@/types/model";

export type FormCallback = ValidateCallback;

export interface IVoteProps {
  election: IElectionEntity;
  onSubmit: EventHandler<FormEvent<HTMLFormElement>>;
}

export interface IFormProps extends FormComponentProps {
  onSubmit: FormCallback;
}
