const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));


app.use(
	"/api",
	createProxyMiddleware({
		target: "process.env.PORT", // URL of your Flask backend
		changeOrigin: true,
	})
);

// All other requests serve the frontend index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
