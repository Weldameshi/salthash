var authHeaderValue = null;
function clearUserCreateData(){
	document.getElementById('user_create_id').value = "";
	document.getElementById('username').value = "";
	document.getElementById('password').value = "";
}
function showUserDiv(){
	document.getElementById('login_div').style.display = "none";    docu
	document.getElementById('user_div').style.display = "block";

	clearAllCreateData();
	clearAllSearchData();
}
function createUser(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
	var user = {
            "username": username,
            "password": password, 
	}
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "http://localhost:8080/user");
	xmlHttp.setRequestHeader('Content-type', 'application/json');
	xmlHttp.setRequestHeader('Authorization', authHeaderValue);
	xmlHttp.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE){
			if(this.status === 403){
				alert("unauthroized user can not create user");
			}
			if(this.status === 401){
				alert("Must log in to create user")
			}
			if(this.status === 200){
				console.log("Success");
			}
		}
	}
	xmlHttp.send(JSON.stringify(user));
	clearUserCreateData();
}

function printObject(object, objectType){
	var personList = document.getElementById(objectType+ "_list");
	personList.innerHTML = JSON.stringify(object)
}
function showObject(objectType){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function(){
		if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
			var ob = JSON.parse(this.responseText);
			printObject(ob, objectType);
		}
	}
	xmlHttp.open("GET", "http://localhost:8080/"+ objectType);
	xmlHttp.send();
}


function login(){
	var username = document.getElementById('login_username').value
	var password = document.getElementById('login_password').value
	authHeaderValue = "Basic " + btoa(username + ":" + password)

	document.getElementById("buttons").style.display = "block";
	document.getElementById("login").style.display = "none";

}
function logout(){
authHeaderValue = null;

document.getElementById("login").style.display = "block";
document.getElementById("buttons").style.display = "none";
showNoDiv();
}
  