import { CanProps, createCanBoundTo } from "@casl/react";
import React from "react";
import { Subscribe } from "unstated";

import AuthenticationContainer from "@/containers/Authentication";
import { getAbility } from "@/lib/abilities";

export default function Can(props: CanProps) {
  return (
    <Subscribe to={[AuthenticationContainer]}>
      {(authentication: AuthenticationContainer) => {
        const ability = getAbility(authentication.getRole());
        const BoundCan = createCanBoundTo(ability);

        return <BoundCan {...props} />;
      }}
    </Subscribe>
  );
}
