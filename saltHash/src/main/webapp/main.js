var authHeaderValue = null;

function showCreateUserDiv() {
    document.getElementById('login_div').style.display = "none";
    document.getElementById('user_div').style.display = "block";
    document.getElementById('success_div').style.display = "none";
}

function showLoginDiv() {
    document.getElementById('login_div').style.display = "block";
    document.getElementById('user_div').style.display = "none";
    document.getElementById('success_div').style.display = "none";
}

function showSuccess() {
    document.getElementById('login_div').style.display = "none";
    document.getElementById('user_div').style.display = "none";
    document.getElementById('success_div').style.display = "block";
}

function hideDivs() {
    document.getElementById('login_div').style.display = "none";
    document.getElementById('user_div').style.display = "none";
    document.getElementById('success_div').style.display = "none";
    document.getElementById('username').innerHTML = "";
    document.getElementById('password').innerHTML = "";
    document.getElementById('login_username').innerHTML = "";
    document.getElementById('login_password').innerHTML = "";
}

function createUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var user = {
        "username": username,
        "password": password
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8080/salt");
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.setRequestHeader('Authorization', authHeaderValue);
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status === 403) {
                alert("unauthroized user can not create user");
            }
            if (this.status === 401) {
                alert("Must log in to create user")
            }
            if (this.status === 200) {
                console.log("Success");
            }
        }
    }
    xmlHttp.send(JSON.stringify(user));
}

function login() {
    var username = document.getElementById('login_username').value
    var password = document.getElementById('login_password').value
    var user = {
        "username": username,
        "password": password
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8080/salt/login");
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.setRequestHeader('Authorization', authHeaderValue);
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var ob = JSON.parse(this.responseText);
            if (ob == true) {
                showSuccess()
            }
        }
    }

    xmlHttp.send(JSON.stringify(user));
}

function logout() {
    authHeaderValue = null;

    document.getElementById("login").style.display = "block";
    document.getElementById("buttons").style.display = "none";
    showNoDiv();
}