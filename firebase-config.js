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

// Use environment variables instead of hardcoded values
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
    appId: import.meta.env.VITE_FIREBASE_APP_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db }; 