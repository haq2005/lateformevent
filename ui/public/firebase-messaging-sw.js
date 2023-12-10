
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js")

let firebaseConfig = {
    apiKey: "AIzaSyDPm5gCjonRSybTOwD7wYGG3aPju6ey1zE",
    authDomain: "lateform-117f2.firebaseapp.com",
    projectId: "lateform-117f2",
    storageBucket: "lateform-117f2.appspot.com",
    messagingSenderId: "393196830062",
    appId: "1:393196830062:web:930e73b66db3a318a4557f",
    measurementId: "G-HPENMT7H7G"
}
const app =firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload =>{
    console.log("you received a message when you  are in offline");
    console.log(payload)

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
        click_action : "http://localhost:3000"
    }

  

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})



