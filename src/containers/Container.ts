/* tslint:disable:no-console */

import { detailedDiff } from "deep-object-diff";
import { mapObjIndexed, pathOr } from "ramda";
import { Container as UnstatedContainer } from "unstated";

const LOG_STATE = Symbol("log state");

const COLORS = {
  action: "inherit",
  added: "#F20404",
  deleted: "#F20404",
  differences: "#03A9F4",
  nextState: "#4CAF50",
  prevState: "#9E9E9E",
  updated: "#F20404"
};

const getColorFactory = (colors: object) => (key: string): string =>
  pathOr("initial", [key], colors);

class Container<State extends object> extends UnstatedContainer<State> {
  public setState(state: Partial<State>, callback?: () => void) {
    if (process.env.DEBUG === "yes") {
      this[LOG_STATE](state);
    }

    return super.setState(state, callback);
  }

  private [LOG_STATE](state: Partial<State>) {
    const getColor = getColorFactory(COLORS);
    const name = pathOr("Container", ["constructor", "name"], this);
    const differences = detailedDiff(this.state, state);

    console.groupCollapsed(`%c action ${name}`, getColor("title"));

    console.log("%c prev state\n", getColor("prevState"), this.state);

    console.groupCollapsed("%c differences", getColor("differences"));

    mapObjIndexed((diff, key) => {
      console.log(`%c ${key}\n`, getColor(key), diff);
    }, differences);

    console.groupEnd();

    console.log("%c next state\n", getColor("nextState"), state);

    console.groupEnd();
  }
}

export default Container;
