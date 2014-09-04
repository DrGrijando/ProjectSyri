var isVaccineTabSelected = true;
var user;
var password;

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION */

function addNewVaccine(){
    var title= document.getElementById("new-vaccine-title").value;
    var date = document.getElementById("new-vaccine-date").value;
    if(title=="" || date=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        newItem.id = 'newdiv';
        newItem.className='vaccine-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Store the new vaccine in the localStorage
        var vaccineToStore={"title":title,"date":date}
        count=localStorage.getItem("vaccineCount");
        
        localStorage.setItem("vaccine"+count,JSON.stringify(vaccineToStore));        
        count++;
        localStorage.setItem("vaccineCount",count);
        
        goBack();
    }    
}

function addNewPrescription(){
    var title= document.getElementById("new-prescription-title").value;
    var date = document.getElementById("new-prescription-date").value;
    var text = document.getElementById("new-prescription-text").value;
    
    if(title=="" || date=="" || text=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        newItem.id = 'newdiv';
        newItem.className='prescription-entry';
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='prescription-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='prescription-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
        
        info = document.createElement("div");
        info.innerHTML=text;
        info.className='prescription-text';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
        
        document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
        
        var prescriptionToStore={"title":title,"date":date,"text":text}
        count=localStorage.getItem("prescriptionCount");
        
        // Store the new prescription in the localStorage
        localStorage.setItem("prescription"+count,JSON.stringify(prescriptionToStore));        
        count++;
        localStorage.setItem("prescriptionCount",count);
        
        goBack();
    }
}

/*function sortVaccines(){
    ul=document.getElementById("vaccine-list");
    var lis=ul.getElementsByTag("div");
    var vals=[];
    
    for(var i=0,l=lis.length;i<1;i++)
    {
        vals.push(lis[i].innerHTML);
    }
    
    vals.sort();
    
    for(var i=0,l=lis.length;i<1;i++)
    {
        lis[i].innerHTML=vals[i];
    }
}*/

function login(){
    user=localStorage.getItem("loginUser");
    password=localStorage.getItem("loginPassword");
    
    if((user==null)||(password==null))
    {
        user=document.getElementById("login-user-input").value;
        password=document.getElementById("login-password-input").value;
        
        if((user=="")&&(password==""))
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Information missing.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        }
        else if(user=="")
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else if(password=="")
        {
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else
        {
            window.localStorage.setItem("loginUser",document.getElementById("login-user-input").value);
            window.localStorage.setItem("loginPassword",document.getElementById("login-password-input").value);    
            document.location.href="#tabstrip-vaccines";
        }
    }
    else
    {
        if((user==document.getElementById("login-user-input").value)&&(password==document.getElementById("login-password-input").value))
        {
            document.location.href="#tabstrip-vaccines";
        }
        else if((document.getElementById("login-user-input").value=="")&&(document.getElementById("login-password-input").value==""))
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Information missing.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        }
        else if(document.getElementById("login-user-input").value=="")
        {
            document.getElementById("login-user-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else if(document.getElementById("login-password-input").value=="")
        {
            document.getElementById("login-password-input").style.cssText="background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML="Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
        else
        {
            document.getElementById("login-error-text").innerHTML="Wrong user name and/or password. Please, try again.";
            document.getElementById("login-error-text").style.cssText="text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
    }
}

function loadData(){
    user=window.localStorage.getItem("user");
    password=window.localStorage.getItem("password");
    
    if((user!=null)&&(password!=null))
    {
        document.getElementById("login-user-input").value=user;
        document.getElementById("options-user-input").value=user;
        document.getElementById("login-password-input").value=password;
        document.getElementById("options-password-input").value=password;
    }
}

function notificationsTest(){
    window.plugin.notification.local.add({
        id: 1,
        title: "Cheer up, boys!",
        message: "Notifications are running!"
    });
}

function resetInputBackground(){
    document.getElementById(window.event.srcElement.id).style.cssText="background-color:rgb(255,255,255) !important;-webkit-transition: background-color 500ms linear;";
}

function deleteLoginInfo(){
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPassword");
    alert("User and password deleted.");
}

function goBack(){
    window.history.go(-1);
}
