import { ChemicalServer } from "chemicaljs";
import express from "express";

const chemical = new ChemicalServer();
const port = process.env.PORT || 3000;

chemical.app.use(
	express.static("dist", {
		index: "index.html",
		extensions: ["html"],
	}),
);

chemical.app.use((req, res) => {
	res.status(404);
	res.sendFile("dist/index.html", { root: "." });
});

chemical.server.listen(port, () => {
	console.log(`Warp listening on port ${port}`);
});
