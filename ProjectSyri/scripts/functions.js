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
        var id=title.concat(date).replace(/-| /g,'');
        newItem.id = id;
        newItem.className='vaccine-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick=viewDetailedVaccine;
        
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Store the new vaccine in the localStorage
        var vaccineToStore={"title":title,"date":date,"id":id}
        var str=localStorage.getItem("vaccines")+"+"+JSON.stringify(vaccineToStore);
        localStorage.setItem("vaccines",str);
        
        vaccines=localStorage.getItem("vaccines").split("+"); // Load vaccines in the local array
        /*count=localStorage.getItem("vaccineCount");
        
        localStorage.setItem("vaccine"+count,JSON.stringify(vaccineToStore));        
        count++;
        localStorage.setItem("vaccineCount",count);
        */
        goBack();
    }    
}

function addNewPrescription(){
    var title= document.getElementById("new-prescription-title").value;
    var date = document.getElementById("new-prescription-date").value;
    var finalDate = document.getElementById("new-prescription-final-date").value;
    var doseTakes=document.getElementById("new-prescription-dose-takes").value;
    var doseTakesMeasure=document.getElementById("new-prescription-dose-takes-measure").value;
    var doseFrequency=document.getElementById("new-prescription-dose-frequency").value;
    var doseFrequencyMeasure=document.getElementById("new-prescription-dose-frequency-measure").value;
    var text = document.getElementById("new-prescription-text").value;
    
    
    if(title=="" || date=="" || finalDate=="" || doseTakes=="" || doseTakesMeasure=="" ||doseFrequency==""||doseFrequencyMeasure=="" ||text=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        var id=title.concat(date).replace(/-| /g,'');
        newItem.id = id;
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
        
        newItem.onclick=viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
        
        // Store the new prescription in the localStorage
        var prescriptionToStore={"title":title,"date":date,"finalDate":finalDate,"doseTakes":doseTakes,
            "doseTakesMeasure":doseTakesMeasure,"doseFrequency":doseFrequency,
            "doseFrequencyMeasure":doseFrequencyMeasure,"text":text,"id":id}
        str=localStorage.getItem("prescriptions")+"+"+JSON.stringify(prescriptionToStore);
        localStorage.setItem("prescriptions",str);
        
        prescriptions=localStorage.getItem("prescriptions").split("+"); // Load prescriptions in the local array
        /*count=localStorage.getItem("prescriptionCount");
                
        localStorage.setItem("prescription"+count,JSON.stringify(prescriptionToStore));        
        count++;
        localStorage.setItem("prescriptionCount",count);
        */
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
    user=window.localStorage.getItem("loginUser");
    password=window.localStorage.getItem("loginPassword");
    
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
    document.getElementById(window.event.srcElement.id).style.cssText="background-color:transparent !important;-webkit-transition: background-color 500ms linear;";
}

function defaultData(){
    var obj = document.getElementById(window.event.srcElement.id);
    var date=new Date();
    
    if(obj.id=="add-vaccine-button")
    {
        document.getElementById("new-vaccine-title").value="";
        document.getElementById("new-vaccine-date").value=date.toISOString().split("T")[0];
    }
    else if(obj.id=="add-prescription-button")
    {
        document.getElementById("new-prescription-title").value="";
        document.getElementById("new-prescription-date").value=date.toISOString().split("T")[0];
        document.getElementById("new-prescription-text").value="";
    }
}

function deleteLoginInfo(){
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPassword");
    alert("User and password deleted.");
}

function viewDetailedVaccine(){
    for(var i=1;i<vaccines.length;i++)
    {
        var v=JSON.parse(vaccines[i]);
        
        if(v.id==window.event.srcElement.parentElement.id)
        {
            document.getElementById("detailed-vaccine-title").innerHTML=v.title;
            document.getElementById("detailed-vaccine-date").innerHTML=v.date;
            break;
        }
    } 
    document.location.href="#detailed-vaccine-view";    
}

function viewDetailedPrescription(){
    for(var i=1;i<vaccines.length;i++)
    {
        var p=JSON.parse(prescriptions[i]);
        
        if(p.id==window.event.srcElement.parentElement.id)
        {
            document.getElementById("detailed-prescription-title").innerHTML=p.title;
            document.getElementById("detailed-prescription-date").innerHTML=p.date;
            document.getElementById("detailed-prescription-final-date").innerHTML=p.finalDate;
            document.getElementById("detailed-prescription-dose").innerHTML=p.doseTakes+" "
            +p.doseTakesMeasure+"/"+p.doseFrequency+" "+p.doseFrequencyMeasure;
            document.getElementById("detailed-prescription-text").innerHTML=p.text;
            break;
        }
    } 
    document.location.href="#detailed-prescription-view";
}




function deleteElement(){
    
}








function test(){
    var v1={"title":"caca","date":"2014-09-09"}
    localStorage.setItem("vaccines",JSON.stringify(v1));
    v1={"title":"pipi","date":"2015-11-25"}
    var str=localStorage.getItem("vaccines")+"+"+JSON.stringify(v1);
    localStorage.setItem("vaccines",str);
    var vector=localStorage.getItem("vaccines").split("+");
}








function goBack(){
    window.history.go(-1);
}
