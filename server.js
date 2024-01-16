const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Additional routes or proxy setup can go here

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
