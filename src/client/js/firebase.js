import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyB3cduBYdQE5UfRFCziBrV2xBQQDNiJdIg",
    authDomain: "blog-react-redux.firebaseapp.com",
    databaseURL: "https://blog-react-redux.firebaseio.com",
    projectId: "blog-react-redux",
    storageBucket: "blog-react-redux.appspot.com",
    messagingSenderId: "342818875961"
}
firebase.initializeApp(config)

var db = firebase.database()
var postsRef = db.ref('posts/')

export { postsRef }

export function saveNewPost(post) {
    postsRef.push(post)
}

export function loadPosts() {
    return new Promise((resolve, reject) => {
        postsRef.limitToLast(20).on('value', function(snapshot) {
            resolve(snapshot.val())
        })
    })
}

export function loginToFirebase() {
    return new Promise((resolve, reject) => {
        const provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken
            var user = result.user
            resolve(user)
        }).catch(function(error) {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorCode + " - " + errorMessage)
            reject(error.message)
        })
    })
}

export function logoutOfFirebase() {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function() {
            resolve()
        }, function(error) {
            reject(error)
        })
    })
}
