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





  $("#signUp").click(function(){

    let email = $('#inputEmail').val();
    let password =  $('#inputPassword').val();
    let cPassword =  $('#inputCPassword').val();

   

      if(email != "" && password != ""  && cPassword != "")
    {
    
        if(password == cPassword)
        {
            let result = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
            //Modal for Not Same Password
            alert("Not same Password");
        }
          
    }
    else{
        // Modal for not filling up values
        alert("Please fill all the values");
    }

  });

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

  $("#signInPage").click(function(){

    window.location.href ="index.html";

  });

 