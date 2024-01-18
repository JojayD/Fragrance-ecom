import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api":
				process.env.NODE_ENV === "development"
					? "http://localhost:3000" // Development backend URL
					: "https://fragrance-ecom-84a3a68169b6.herokuapp.com/", // Production backend URL
		},
	},
});
