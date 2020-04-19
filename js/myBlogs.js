

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
    if (!user) {
      // User is signed in.

      window.location.href = "index.html";

      // ...
    } 
    else{

        console.log(user.uid);

        

  let dbBlogs = firebase.database().ref().child("Blogs").orderByChild("uid").equalTo(user.uid);

  dbBlogs.on("value", function(blogs){

    if(blogs.exists)
    {
      let blogHtml = "";
      blogs.forEach(function(singleBlog){

   

        blogHtml += `<div class="jumbotron bg-light border border-dark" >`;

        blogHtml += "<div><img width='1024px' height='550px' src='"
        blogHtml += singleBlog.val().image;
        blogHtml += "'/> </div> <br>";

        blogHtml += "<div class='row'>";
        blogHtml += "<div class='col-sm-5'><p style='color:grey;'>"
        +
        "Published by: " + singleBlog.val().userName
        +"</p></div>" +
        
        "<div class='col-sm-3'><p style='color:grey;'>"
        +
        "Time by: " + singleBlog.val().time
        +"</p></div>"

        +

        "<div class='col-sm-4'><p style='color:grey;'>"
        +
        "Date: " + singleBlog.val().date
        +"</p></div>";

        blogHtml += `</div> <br>`;

        blogHtml += "<div style='text-align: justify; color: black;'>"
        blogHtml += singleBlog.val().desc;
        blogHtml += `</div> <br>`;

        blogHtml += "<div class='form-group' style='text-align: justify; color: black;'>"
        blogHtml += "<button class='form-control btn btn-light bg-dark text-white' onclick=deleteBlogRecord('"+singleBlog.key+"')>DeleteThis Post</button>";
        blogHtml += `</div> <br>`;

        blogHtml += "</div>";

      });

      $("#blogs").html(blogHtml);

    }

  });


    

    }

    

  
  });

  function deleteBlogRecord(key)
    {
        let deleteRef = firebase.database().ref().child("Blogs").child(key);

        return deleteRef.remove()
        .then(function(){

            console.log("Removed Successfully");

        }).catch(function(){

            console.log("Error Occures");

        });
    }



  //================Reterive and Dispaly Data from Storage==========





  //==================Reteriev ends here==============================