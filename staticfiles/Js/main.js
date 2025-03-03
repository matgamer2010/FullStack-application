// Using data of api

// TODO: request an api of database_clothes

function request_api(){
    url = "http://localhost:8000/Crud/?format=json"
    .fetch()
    .then((response)=>response.json)
    .then((profile)=> profilePage());
}

function profilePage(profile){
    console.log("We reach at the 'profilePage' function.");
}

function redirect_user_to_his_profile(){
    Profile = document.getElementById("UserProfile");
    Profile.addEventListener("onclick", ()=>{
        onclick=window.location.href='http://localhost:8000/profile_user/'
    })
}
