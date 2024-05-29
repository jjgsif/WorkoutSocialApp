import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBQfXqXh70xHOHba5LF6C-RctQplfUZJqs",
    authDomain: "workout-social-app.firebaseapp.com",
    projectId: "workout-social-app",
    storageBucket: "workout-social-app.appspot.com",
    messagingSenderId: "467858402511",
    appId: "1:467858402511:web:51835da9958ecbf9ac9bba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

