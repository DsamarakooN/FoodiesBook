import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyAfwPcrU6Mebkc-TXGLSlwd05_U0V1UYKU",
    authDomain: "foodies-uploads.firebaseapp.com",
    projectId: "foodies-uploads",
    storageBucket: "foodies-uploads.appspot.com",
    messagingSenderId: "636319138448",
    appId: "1:636319138448:web:fb755ade6b66e4ae9e0e15",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;