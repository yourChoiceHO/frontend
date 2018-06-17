let token = "";

const TokenStore = {
  get: () => token,
  set: (t: string) => (token = t)
};

Object.freeze(TokenStore);

export default TokenStore;
