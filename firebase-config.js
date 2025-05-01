// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Verify allowed domains
const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'contact-me-2abe9.web.app',
    'contact-me-2abe9.firebaseapp.com',
    'portfolio-raaaghavagrawals-projects.vercel.app'
];

function isAllowedDomain() {
    const currentDomain = window.location.hostname;
    return allowedDomains.includes(currentDomain);
}

// Only initialize Firebase if we're on an allowed domain
if (!isAllowedDomain()) {
    console.error('Unauthorized domain. Firebase services will not be initialized.');
    throw new Error('Unauthorized domain');
}

const firebaseConfig = {
    apiKey: "AIzaSyDJvk4A_K6bsS0HpvCgpxl0-0WxKLTLdQI",
    authDomain: "contact-me-2abe9.firebaseapp.com",
    projectId: "contact-me-2abe9",
    storageBucket: "contact-me-2abe9.appspot.com",
    messagingSenderId: "268574464357",
    appId: "1:268574464357:web:f7c19803e9d8fcdc809f67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db }; 