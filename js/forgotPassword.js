
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

  $("#signInPage").click(function(){

    window.location.href ="index.html";

  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        window.location.href = "Dashboard.html";
      // ...
    } 
  
  });

  $("#btn-resetPassword").click(function(){

    let auth = firebase.auth();
    let email = $("#inputEmail").val();

    if( email != "")
    {
        auth.sendPasswordResetEmail(email)
            .then(function() {
             //Modal

             alert("Password reset link has been send to your email");
             window.location.href = "index.html";
            })
            .catch(function(error) {
              let message = error.message;
              let code = error.code;

              console.log("Message: " + message );
              console.log("code: " + code);

              alert("Message: " + message);
            });
    }
    else{
        //Modal

        alert("Please provide valid email or email field is empty");
    }

  });
