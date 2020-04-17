

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
  
  });

  $('#logoutBtn').click(function(){

        firebase.auth().signOut();

  });


  //============Validation of Post Blogs==========================

    let validationImages = ["image/gif", "image/jpeg", "image/png"];

    $("#selectedImage").hide();

    function previewImage(image_blog)
    {
      if(image_blog.files && image_blog.files[0])
      {
        let reader = new FileReader();
      reader.onload = function(e)
      {
        $("#selectedImage").attr('src', e.target.result);
    
          // $("#selectedImage").fadeIn();    
      
        
      }
      reader.readAsDataURL(image_blog.files[0]);

      $("#selectedImage").show();

      }
    }
    $("#mainImageBlog").change(function(){

      previewImage(this);

    });

    $("#save-blog").click(function(){

      $("#descriptionBlogSection").removeClass("is-invalid");
      $("#mainImageBlog").removeClass("is-invalid");

      let desc = $("#descriptionBlogSection").val();
      var pic =  $("#mainImageBlog").prop("files")[0];

        if(!desc)
        {
          $("#descriptionBlogSection").addClass("is-invalid");
          return;
        }
        if(pic == null)
        {
          $("#mainImageBlog").addClass("is-invalid");
          return;

        }

        if($.inArray(pic["type"], validationImages)<0)
        {
          $("#mainImageBlog").addClass("is-invalid");
          return;
        }


    });

  //============Validation ends here=================================

