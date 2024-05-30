import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';        
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBQfXqXh70xHOHba5LF6C-RctQplfUZJqs",
    authDomain: "workout-social-app.firebaseapp.com",
    projectId: "workout-social-app",
    storageBucket: "workout-social-app.appspot.com",
    messagingSenderId: "467858402511",
    appId: "1:467858402511:web:51835da9958ecbf9ac9bba",
    databaseURL: 'https://workout-social-app-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const db = getDatabase(app);

