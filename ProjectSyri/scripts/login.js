function login() {
    user = localStorage.getItem("loginUser");
    password = localStorage.getItem("loginPassword");
    
    if ((user == null) || (password == null)) 
    {
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
            window.localStorage.setItem("loginUser", document.getElementById("login-user-input").value);
            window.localStorage.setItem("loginPassword", document.getElementById("login-password-input").value);    
            document.location.href = "#tabstrip-vaccines";
        }
    } 
    else
    {
        if ((user == document.getElementById("login-user-input").value) && (password == document.getElementById("login-password-input").value))
        {            
            document.location.href = "#tabstrip-vaccines";
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
    }
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
        jsonObject = {"email":mail,"password":password,"profile":"object"};
        
        $.ajax({
            url: "http://localhost:3000/User",
            type: "post",
            dataType: "json",
            data: jsonObject,
            success:function(msg)
            {
                alert(msg.status);
            }
        });
        
        goBack();
    }
}

function highlightInputError(input)
{
    document.getElementById(input).style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
}