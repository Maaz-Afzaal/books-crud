const express = require("express");
const dotenv = require("dotenv"),
	bodyParser = require("body-parser");

const { connectMongo } = require("./config/mongodb");

const { crossOriginResource } = require("./utilities/cors");

const app = express(); // Init Express APP

const server = require("http").Server(app);

const route = require("./routes");

dotenv.config();

app.use(crossOriginResource);

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(route);

app.get("/", (req, res) => {
	res.write("App is running");
	res.end();
});

server.listen(process.env.PORT_NO, async () => {
	await connectMongo();
	console.log(`Server Running ON Port ${process.env.PORT_NO}`);
});
// .on("error", function (err) {
// 	process.once("SIGUSR2", function () {
// 		process.kill(process.pid, "SIGUSR2");
// 	});
// 	process.on("SIGINT", function () {
// 		// this is only called on ctrl+c, not restart
// 		process.kill(process.pid, "SIGINT");
// 	});
// });
