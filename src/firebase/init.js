import firebase from 'firebase';
// import firestore from 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyDtc7q1FvCmLD1YOy8wJHubTLhEQljh34s",
    authDomain: "smoothie-ingredients.firebaseapp.com",
    databaseURL: "https://smoothie-ingredients.firebaseio.com",
    projectId: "smoothie-ingredients",
    storageBucket: "smoothie-ingredients.appspot.com",
    messagingSenderId: "365713900564",
    appId: "1:365713900564:web:6a89dc1aa6534ccb"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);


export default firebaseApp.firestore()