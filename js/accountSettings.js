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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
          let uId = firebase.auth().currentUser.uid;
  
          firebase.database().ref("Users/" + uId).once('value').then(function(dataSnapshot){
  
            if(dataSnapshot.val())
            {
              window.location.href = "Dashboard.html";
            }
          
  
          });
  
        // ...
      } 
    else{
        window.location.href="index.html";
    }
  
  });


$("#update").click(function(){

    let firstName = $("#inputFirstName").val();
    let secondName = $("#inputSecondName").val();
    let phoneNumber = $("#inputPNo").val();
    let Profession = $("#inputProfession").val();
    let bio = $("#inputBio").val();

    let rootRef = firebase.database().ref().child("Users");
    let uID = firebase.auth().currentUser.uid;
    let usersRef = rootRef.child(uID);

    if(firstName != "" && secondName != "" && phoneNumber != "" && Profession != "")
    {
        let userData = 
        {
            "firstName": firstName,
            "secondName": secondName,
            "phoneNumber": phoneNumber,
            "profession": Profession,
            "bio": bio
        }

        usersRef.set(userData, function(error){

            if(error)
            {
                var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message: " + errorMessage);

            }
            else{
                //Modal
                window.alert("Updated Details Successfully")
                window.location.href=" Dashboard.html";
            }

        });
    }
    else{
        //Modal
        alert("Please fill up required Details");

    }


});