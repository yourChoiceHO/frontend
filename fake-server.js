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
  res.jsonp({
    user: router.db
      .get("user")
      .find({ username: req.body.username, password: req.body.password })
      .value()
  });
});

server.post("/voter/authenticate", (req, res) => {
  res.jsonp({
    user: router.db
      .get("voter")
      .find({ hash: req.body.hash })
      .value()
  });
});

server.use(router);
server.listen(PORT, () => {
  console.log(`Fake Server is running on port ${PORT}`);
  console.log("Listening...");
});
