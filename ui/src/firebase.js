import { initializeApp } from "firebase/app"
import {getMessaging} from 'firebase/messaging'
let firebaseConfig = {
    apiKey: "AIzaSyDPm5gCjonRSybTOwD7wYGG3aPju6ey1zE",
    authDomain: "lateform-117f2.firebaseapp.com",
    projectId: "lateform-117f2",
    storageBucket: "lateform-117f2.appspot.com",
    messagingSenderId: "393196830062",
    appId: "1:393196830062:web:930e73b66db3a318a4557f",
    measurementId: "G-HPENMT7H7G"
}
export const app = initializeApp(firebaseConfig);
export const messaging  = getMessaging(app)
