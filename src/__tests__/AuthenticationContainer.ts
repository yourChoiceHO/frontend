import AuthenticationContainer from "@/containers/Authentication";
import { Role } from "@/types/model";

let authentication: AuthenticationContainer;

beforeEach(() => {
  authentication = new AuthenticationContainer();
});

describe("Authentication Container", () => {
  it("initially no user is logged in", () => {
    expect.assertions(2);

    expect(authentication.getRole()).toBe(Role.Unauthorized);
    expect(authentication.isLoggedIn()).toBe(false);
  });

  it("cancellation never executes the request", () => {
    expect.assertions(3);

    const { cancel } = authentication.loginUser({
      password: "supervisor",
      username: "password"
    });

    cancel();

    expect(authentication.getRole()).toBe(Role.Unauthorized);
    expect(authentication.isLoggedIn()).toBe(false);
    expect(authentication.state.error).toEqual({});
  });

  it("a user can login", () => {
    expect.assertions(3);

    const { notifier } = authentication.loginUser({
      password: "password",
      username: "supervisor"
    });

    return notifier.then(() => {
      // expect(authentication.state).toMatchSnapshot();
      expect(authentication.getRole()).toBe(Role.Supervisor);
      expect(authentication.isLoggedIn()).toBe(true);
      expect(authentication.state.error).toEqual({});
    });
  });

  it("unknown user will result in an error", () => {
    expect.assertions(3);

    const { notifier } = authentication.loginUser({
      password: "",
      username: "$$$$$$$$"
    });

    return notifier.catch(() => {
      expect(authentication.getRole()).toBe(Role.Unauthorized);
      expect(authentication.isLoggedIn()).toBe(false);
      expect(authentication.state.error.response.status).toEqual(404);
    });
  });

  it("a user can logout", () => {
    expect.assertions(4);

    const { notifier } = authentication.loginUser({
      password: "password",
      username: "supervisor"
    });

    return notifier
      .then(() => {
        expect(authentication.isLoggedIn()).toBe(true);
        return authentication.logout().notifier;
      })
      .then(() => {
        expect(authentication.getRole()).toBe(Role.Unauthorized);
        expect(authentication.isLoggedIn()).toBe(false);
        expect(authentication.state.error).toEqual({});
      });
  });
});
