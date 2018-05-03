import { elections } from "@/__mocks__/election";
import * as election from "@/lib/api/election";

describe("Election REST API", () => {
  it("resolves to all available elections", () => {
    expect.assertions(1);
    return election
      .getAll()
      .promise().then(result => expect(result).toEqual(elections));
    });
  });

  it("resolves to a single election with id: 0", () => {
    expect.assertions(1);
    return election
      .get(0)
      .promise().then(result => expect(result).toEqual(elections[0]));
    });
  });

  it("resolves to a new election", () => {
    const expected = {
      id_election: 10
    }

    expect.assertions(1);
    return election
      .create(expected)
      .promise().then(result => expect(result).toEqual(expected));
    });
  });
});
