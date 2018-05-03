import { AbilityBuilder } from "@casl/ability";
import { propOr } from "ramda";

import { IUserEntity, Role } from "@/types/model";

type AbilityBuilderFunction = (
  action: string | string[],
  subject: string | string[]
) => void;

const abilities = {
  [Role.Unauthorized]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("vote", "Election");
    }
  ),
  [Role.Voter]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("vote", "Election");
    }
  ),
  [Role.Moderator]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("view", "Election");
      can("edit", "Election");
      can("delete", "Election");
    }
  ),
  [Role.Supervisor]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("view", "Election");
      can("edit", "Election");
      can("delete", "Election");
      can("evaluate", "Election");
    }
  )
};

export function getAbility(user: IUserEntity) {
  const role: Role = propOr(Role.Unauthorized, "role", user);
  return abilities[role];
}
