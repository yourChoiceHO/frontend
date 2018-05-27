import hoistNonReactStatics from "hoist-non-react-statics";
import { keys, values, zipObj } from "ramda";
import React from "react";
import { Subscribe } from "unstated";

const connect = containersAsProps => UnwrappedComponent => {
  const names = keys(containersAsProps);

  const Wrapper = (props, ref) => (
    <Subscribe to={values(containersAsProps)}>
      {(...contexts) => {
        const injectedProps = zipObj(names, contexts);
        // return <UnwrappedComponent {...props} {...injectedProps} ref={ref} />;
        return <UnwrappedComponent {...props} {...injectedProps} />;
      }}
    </Subscribe>
  );

  const name = UnwrappedComponent.displayName || UnwrappedComponent.name;
  Wrapper.displayName = `connect([${names.join(",")}])(${name})`;

  // return hoistNonReactStatics(React.forwardRef(Wrapper), UnwrappedComponent);
  return hoistNonReactStatics(Wrapper, UnwrappedComponent);
};

export default connect;
