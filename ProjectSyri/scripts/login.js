var user;
var password;

function login() {
    user = document.getElementById("login-user-input").value;
    password = document.getElementById("login-password-input").value;
    
    if ((user == "") && (password == ""))
    {
        highlightInputError("login-user-input");
        highlightInputError("login-password-input");
        alert("Information missing.");
    }
    else if (user == "")
    {
        highlightInputError("login-user-input");
        alert("Please, enter your user email before proceeding.");            
    }
    else if (password == "")
    {
        highlightInputError("login-password-input");
        alert("Please, enter your password before proceeding.");            
    }
    else
    {
        $.ajax({
            url: "http://localhost:3000/login/"+user+"/"+password,
            type: "get",            
            dataType: "json",
            success:function(msg)
            {
                window.localStorage.setItem("loginUser", document.getElementById("login-user-input").value);
                window.localStorage.setItem("loginPassword", document.getElementById("login-password-input").value);    
                document.location.href = "#tabstrip-vaccines";
            },
            error:function(msg)
            {
                if(msg.status=="404")
                {
                    alert("The user doesn't exist.");
                }
                else if(msg.status=="405")
                {
                    alert("Incorrect user e-mail or password.");
                }                
            }
        });            
    }
    
   /* else
    {
        if ((user == document.getElementById("login-user-input").value) && (password == document.getElementById("login-password-input").value))
        {            
            $.ajax({
                url: "http://localhost:3000/login/"+user+"/"+password,
                type: "get",
                dataType: "json",
                success:function(msg)
                {
                    window.localStorage.setItem("loginUser", document.getElementById("login-user-input").value);
                    window.localStorage.setItem("loginPassword", document.getElementById("login-password-input").value);    
                    document.location.href = "#tabstrip-vaccines";
                }
            });   
        } 
        else if ((document.getElementById("login-user-input").value == "") && (document.getElementById("login-password-input").value == ""))
        {
            highlightInputError("login-user-input");
            highlightInputError("login-password-input");
            alert("Information missing.");            
        }
        else if (document.getElementById("login-user-input").value == "")
        {
            highlightInputError("login-user-input");
            alert("Please, enter your user email before proceeding.");
        } 
        else if (document.getElementById("login-password-input").value == "")
        {
            highlightInputError("login-password-input");
            alert("Please, enter your password before proceeding.");
        } 
        else
        {
            alert("Wrong user name and/or password. Please, try again.");
        }
    }*/
}

function register()
{
    var mail = document.getElementById("register-user-input").value;
    var password = document.getElementById("register-password-input").value;
    var jsonObject;
    if(mail == "" && password == "")
    {
        highlightInputError("register-user-input");
        highlightInputError("register-password-input");
        alert("Enter the required fields before registering.");
    }
    else if(mail == "")
    {
        highlightInputError("register-user-input");
        alert("An e-mail is required for registering.");
    }
    else if(password == "")
    {
        highlightInputError("register-password-input");
        alert("Enter your password before registering.");
    }
    else
    {
        jsonObject = {"email":mail,"password":password};
        
        $.ajax({
            url: "http://localhost:3000/User",
            type: "post",
            dataType: "json",
            data: jsonObject,
            success:function(msg)
            {
                $.ajax({
                    url: "http://localhost:3000/login/"+mail+"/"+password,
                    type: "get",
                    dataType: "json",
                    data: jsonObject,
                    success:function(msg)
                    {
                        window.localStorage.setItem("loginUser", mail);
                        window.localStorage.setItem("loginPassword", password);    
                        document.location.href = "#tabstrip-vaccines";
                        document.getElementById("register-user-input").value = "";
                        document.getElementById("register-password-input").value = "";
                    }
                });
            }
        });
    }
}

function highlightInputError(input)
{
    document.getElementById(input).style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
}

// USED FOR DEBUG PURPOSES
function deleteLoginInfo() 
{
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPassword");
    alert("User and password deleted.");
}
