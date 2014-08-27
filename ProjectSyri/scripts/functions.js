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
        window.localStorage.setItem("user",document.getElementById("login-user-input").value);
        window.localStorage.setItem("password",document.getElementById("login-password-input").value);    
        document.location.href="#tabstrip-vaccines";
        
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

function goBack(){
    window.history.go(-1);
}
