import { createCanBoundTo } from "@casl/react";
import { propOr } from "ramda";
import React, { ReactNode } from "react";
import { Subscribe } from "unstated";

import AuthenticationContainer from "@/containers/Authentication";
import { getAbility } from "@/lib/abilities";
import { IUserEntity } from "@/types/model";

interface ICanProps {
  do: string;
  on: object | string;
  children: ReactNode;
}

export default function Can(props: ICanProps) {
  return (
    <Subscribe to={[AuthenticationContainer]}>
      {authentication => {
        const user: IUserEntity = propOr({}, "user", authentication);
        const ability = getAbility(user);
        const BoundCan = createCanBoundTo(ability);
        return <BoundCan {...props} />;
      }}
    </Subscribe>
  );
}
