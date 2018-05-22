import { CanProps, createCanBoundTo } from "@casl/react";
import React from "react";
import { Subscribe } from "unstated";

import AuthenticationContainer from "@/containers/Authentication";
import { getAbility } from "@/lib/abilities";

function convertToCannot(BoundCan) {
  return class BoundCannot extends BoundCan {
    constructor(props) {
      super(props);
    }

    public check(props = null) {
      const params = props || this.props;
      return this.state.ability.cannot(params.do, params.on);
    }
  };
}

export default function Cannot(props: CanProps) {
  return (
    <Subscribe to={[AuthenticationContainer]}>
      {(authentication: AuthenticationContainer) => {
        const ability = getAbility(authentication.getRole());
        const BoundCan = createCanBoundTo(ability);
        const BoundCannot = convertToCannot(BoundCan);

        return <BoundCannot {...props} />;
      }}
    </Subscribe>
  );
}
