const cors = require("cors");
const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

const backendUrl =
	process.env.NODE_ENV === "production"
		? "https://guarded-taiga-31175-3b9300d9a8ba.herokuapp.com/"
		: "http://127.0.0.1:5001";

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.use(
	"/api",
	createProxyMiddleware({
		target: backendUrl,
		changeOrigin: true,
		onError: (err, req, res) => {
			console.error(`Error in proxy middleware: ${err.message}`);
			res.status(500).send("Internal Server Error");
		},
	})
);
// All other requests serve the frontend index.html
app.use((req, res, next) => {
	res.status(400).send("400 Bad server request");
});

app.get("*", (req, res) => {
	if (res.status) {
		console.log("Error in handling request");
	}
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
