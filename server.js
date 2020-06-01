const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const morgan = require("morgan");

app.use(express.json());

morgan(":method :url :status :res[content-length] - :response-time ms");

app.use("/dist", express.static("dist"));
app.use("/css", express.static("css"));

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/global", (req, res, next) => {
	db.addGlobal(req.body)
		.then((global) => res.send("global posted"))
		.catch(next);
});

app.post("/api/us", (req, res, next) => {
	db.addUs(req.body)
		.then((us) => res.send("us posted"))
		.catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => {
		console.log(`listening on port ${port}...`);
	});
});
