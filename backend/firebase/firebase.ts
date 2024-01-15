// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAo5VuJPCMa2KnNIFEk11eoygN7h1f_CPE",
	authDomain: "fragrance-e-commerce.firebaseapp.com",
	projectId: "fragrance-e-commerce",
	storageBucket: "fragrance-e-commerce.appspot.com",
	messagingSenderId: "1049317073095",
	appId: "1:1049317073095:web:d2581f80d1f217b769dee2",
	measurementId: "G-GYVJXSQ4T3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
