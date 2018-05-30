const R = require("ramda");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1"
  })
);

server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.post("/user/authenticate", (req, res) => {
  const user = router.db
    .get("user")
    .find({ username: req.body.username, password: req.body.password })
    .value();

  if (R.isNil(user) || R.isEmpty(user)) {
    res.sendStatus(404);
  } else {
    res.jsonp({ user });
  }
});

server.post("/voter/authenticate", (req, res) => {
  const voter = router.db
    .get("voter")
    .find({ hash: req.body.hash })
    .value();

  if (R.isNil(voter) || R.isEmpty(voter)) {
    res.sendStatus(404);
  } else {
    res.jsonp({ voter });
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Fake Server is running on port ${PORT}`);
  console.log("Listening...");
});
