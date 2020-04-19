

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


  $("#myBlogs").click(function(){

    window.location.href="myBlogs.html"

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
    
          $("#selectedImage").fadeIn();    
      
        
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

        
  //============Validation ends here=================================


        //==========================Upload and Save Blogs to Firebase storage ============================

    let databaseRef = firebase.database().ref().child("Blogs");

    databaseRef.once("value").then(function(snapshot){

      let name = pic["name"];
      let dateStr = new Date().getTime();
      let fileCompleteName = name + "_" + dateStr;

      let storageRef = firebase.storage().ref("Blog Images");
      let blogStorageRef = storageRef.child(fileCompleteName);

      let uploadTask = blogStorageRef.put(pic);

     uploadTask.on(
       "state_changed", 

       function progress(snapshot)
       {
         var percent = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;

         $("#upload-progress").html(Math.round(percent) + "%");
         $("#upload-progress").attr("style","width" + percent + "%");

       },
       function error(err)
       {

       },
       function complete()
       {
         let user = firebase.auth().currentUser;
         let userName;
         firebase.database().ref("Users/" + user.uid).once("value").then(function(snapshot){

          let fName = (snapshot.val() && snapshot.val().firstName);
          let sName = (snapshot.val() && snapshot.val().secondName);

          userName = fName + " " + sName;
    

         });

         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){

          let time = new Date();
          let options = {

            weekday: "long",
            month: "long",
            day:"2-digit",
            year:"numeric"

          };

          let blogData = {

            "image": downloadURL,
            "iName": fileCompleteName,
            "desc": desc,
            "uid": user.uid,
            "counter":5000 - counter,
            "userName":userName,
            "time":time.toLocaleString("en-US",{hour: 'numeric', minute: "numeric", hour12: true}),
            "date": time.toLocaleDateString('en-US', options)

          };

          let newPostRef = databaseRef.push();

          newPostRef.set(blogData, function(error){

            if(error)
            {
              $("#result").attr("class","alert alert-danger");
              $("#result").html(error.message);
            }
            else{
              $("#result").attr("class","alert alert-success");
              $("#result").html("Blog Uploaded Successfully");

              window.open("","_self");

            }

            resetForm();

          });

         });

       }
     
     ); 

    });

  //================================================================================
    });

    function resetForm(){
      $("#blog-form")[0].reset();
      $("#selectedImage").fadeOut();
      $("upload-progress").html("Completed");
    }

  //================Reterive and Dispaly Data from Storage==========

  let dbBlogs = firebase.database().ref().child("Blogs").orderByChild("counter");

  dbBlogs.on("value", function(blogs){

    if(blogs.exists)
    {
      let blogHtml = "";
      blogs.forEach(function(singleBlog){

        counter = counter + 1;

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

       

        blogHtml += "</div>";

      });

      $("#blogs").html(blogHtml);

    }

  });

  const navSlide = () => {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener("click", () => {
        nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {

        if(link.style.animation)
        {
            link.style.animation = "";
        }
        else{
            link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
        }
    });
    burger.classList.toggle('toggle');
    });
}

navSlide();
 





  //==================Reteriev ends here==============================