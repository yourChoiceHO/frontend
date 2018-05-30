import { AbilityBuilder } from "@casl/ability";

import { Role } from "@/types/model";

type AbilityBuilderFunction = (
  action: string | string[],
  subject: string | string[]
) => void;

const abilities = {
  [Role.Unauthorized]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      cannot("vote", "Election");
      cannot("view", "Election");
      cannot("edit", "Election");
      cannot("create", "Election");
      cannot("delete", "Election");
      cannot("evaluate", "Election");
    }
  ),
  [Role.Voter]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("access", "Election");
      can("vote", "Election");
      cannot("view", "Election");
      cannot("edit", "Election");
      cannot("create", "Election");
      cannot("delete", "Election");
      cannot("evaluate", "Election");
    }
  ),
  [Role.Moderator]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("access", "Election");
      cannot("vote", "Election");
      can("view", "Election");
      can("edit", "Election");
      can("create", "Election");
      can("delete", "Election");
      cannot("evaluate", "Election");
    }
  ),
  [Role.Supervisor]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("access", "Election");
      cannot("vote", "Election");
      can("view", "Election");
      can("edit", "Election");
      can("create", "Election");
      can("delete", "Election");
      can("evaluate", "Election");
    }
  ),
  [Role.Admin]: AbilityBuilder.define(
    (can: AbilityBuilderFunction, cannot: AbilityBuilderFunction) => {
      can("access", "Election");
      cannot("vote", "Election");
      can("view", "Election");
      can("edit", "Election");
      can("create", "Election");
      can("delete", "Election");
      can("evaluate", "Election");
    }
  )
};

export function getAbility(role: Role) {
  return abilities[role];
}
