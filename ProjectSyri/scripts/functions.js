var isVaccineTabSelected = true;
var user;
var password;
/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION (UNIFIED) (NOT USED AT THIS MOMENT) */

function activateVaccines(){
    isVaccineTabSelected = true;
}

function activatePrescriptions(){
    isVaccineTabSelected = false;
}

function addElement(){
    var auxString;
    var newItem = document.createElement("LI"); // The element type to create must be on capital letters
    
    if(isVaccineTabSelected == true)
    {
        auxString = document.getElementById("new-vaccine-title").value;
    }
    else    
    {
        auxString = document.getElementById("new-prescription-title").value;
    }    
    
    var newTextNode = document.createTextNode(auxString);
    newItem.appendChild(newTextNode);	// Add the TextNode to the ListItem
    
    if(isVaccineTabSelected == true)
    {
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the ListItem to the specified List
    }
    else    
    {
        document.getElementById("prescription-list").appendChild(newItem);	// Add the ListItem to the specified List   
    }
    goBack();
}

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION (SEPARATED) */

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
        goBack();
    }    
}

function addNewPrescription(){
    var newItem = document.createElement("div");
    newItem.id = 'newdiv';
    newItem.className='prescription-entry';
        
    var info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-title").value;
    info.className='prescription-title';
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-text").value;
    info.className='prescription-text';
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
    goBack();
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

function saveLoginData(){
    user=document.getElementById("login-user-input").value;
    password=document.getElementById("login-password-input").value;
    
    if((user=="")&&(password==""))
    {
        alert("Please, enter the required information before proceeding.");
    }
    else if(user=="")
    {
        alert("Please, enter your user email before proceeding.");
    }
    else if(password=="")
    {
        alert("Please, enter your password before proceeding.");
    }
    else
    {
        localStorage.setItem("user",document.getElementById("login-user-input").value);
        localStorage.setItem("password",document.getElementById("login-password-input").value);    
        document.location.href="#tabstrip-vaccines";
    }
}

function loadData(){
    user=localStorage.getItem("user");
    password=localStorage.getItem("password");
    
    if((user!=null)&&(password!=null))
    {
        document.getElementById("login-user-input").value=user;
        document.getElementById("options-user-input").value=user;
        document.getElementById("login-password-input").value=password;
        document.getElementById("options-password-input").value=password;
    }
}

function goBack(){
    window.history.go(-1);
}
