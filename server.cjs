const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "dist")));

// Proxy API requests to Flask backend
app.use(
	"/api",
	createProxyMiddleware({
		target: "http://127.0.0.1:5001", // URL of your Flask backend
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
