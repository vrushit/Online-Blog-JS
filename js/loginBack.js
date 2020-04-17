// login Backend for Firebase
/// Firebase Section



var firebaseConfig = {
    apiKey: "AIzaSyDDG1VkMcCDx_7CVuQNUjsTBFexCLItH64",
    authDomain: "online-blog-js-app.firebaseapp.com",
    databaseURL: "https://online-blog-js-app.firebaseio.com",
    projectId: "online-blog-js-app",
    storageBucket: "online-blog-js-app.appspot.com",
    messagingSenderId: "14531594785",
    appId: "1:14531594785:web:1be625d81336f9d3ab7160",
    measurementId: "G-01KVTJRHM7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


$(".btn-lg").click(function(){

    let email = $("#inputEmail").val();
    let password = $('#inputPassword').val();

    // alert(email);
    // alert(password);

    if(email != "" && password != "")
    {
        let result = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message: " + errorMessage);
          });
    }
    else{
        //Modal
    }

});

$("#signUp").click(function(){
  window.location.href = "registerSignUp.html";


});

 ///
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        let uId = firebase.auth().currentUser.uid;

        firebase.database().ref("Users/" + uId).once('value').then(function(dataSnapshot){

          if(dataSnapshot.val())
          {
            window.location.href = "Dashboard.html";
          }
          else{
            window.location.href = "AccountSettings.html";

          }

        });

      // ...
    } 
  
  });