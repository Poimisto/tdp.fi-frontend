var liveServer = require("live-server");
const build = require("./build");
const chokidar = require("chokidar");

console.log("enable dev server");

console.log(__dirname);

// Initialize watcher.
var watcher = chokidar.watch(
  [__dirname + "/_pages", __dirname + "/_posts", __dirname + "/src"],
  {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  }
);
// Add event listeners.
let changeID = false;
watcher.on("change", function () {
  console.log("change detected");
  changeID = Math.random().toString(36).slice(-2);
  setTimeout(
    function (id) {
      if (changeID === id) build();
    },
    2000,
    changeID
  );
});

const params = {
  port: 8000, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: __dirname + "/public", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  file: "/error.html", // When set, serve this file for every 404 (useful for single-page applications)
  wait: 4000, // Waits for all changes, before reloading. Defaults to 0 sec.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lot
};
build().then(function () {
  liveServer.start(params);
});
