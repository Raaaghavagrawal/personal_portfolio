// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Verify allowed domains
const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'contact-me-2abe9.web.app',
    'contact-me-2abe9.firebaseapp.com'
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
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY , // Fallback for local development
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db }; 