var user;
var password;

function login() {
    user = document.getElementById("login-user-input").value;
    password = document.getElementById("login-password-input").value;
    var i;
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
                localStorage.setItem("loginUser", document.getElementById("login-user-input").value);
                localStorage.setItem("loginPassword", document.getElementById("login-password-input").value);    
                document.getElementById("options-user-input").value = window.localStorage.getItem("loginUser");
                document.getElementById("options-password-input").value = window.localStorage.getItem("loginPassword");
                
                // Save user ID for synchronizing their entries
                localStorage.setItem("userId",msg.userId);
                
                // Get the user information about their vaccines, prescriptions and PHRs
                $.ajax({
                    url: "http://localhost:3000/User/"+msg.userId,
                    type: "get",      
                    async:false,
                    success:function(usr)
                    {
                        if(usr.myVaccines.length > 0)
                        {
                            var auxVaccines;
                            
                            $.ajax({
                                url: "http://localhost:3000/Vaccines",
                                type: "get",      
                                async:false,
                                dataType: "json",
                                success:function(vac)
                                {
                                    auxVaccines = vac.result;    // Save all the vaccines retrieved in an auxiliar array
                                }
                            });
                            var myVaccines = usr.myVaccines;
                            i=0;
                            while(i < myVaccines.length)
                            {
                                for(var j=0;j<auxVaccines.length;j++)    // For the actual item in myVaccine, chek all items of auxVaccines
                                {
                                    if(myVaccines[i] == auxVaccines[j].vid)    // If the curren auxVaccines item has the same ID as one of myVaccines
                                    {
                                        if(auxVaccines[j].inRecord=="false"){vaccines.push(auxVaccines[j]);}
                                        else{record.push(auxVaccines[j]);}
                                        break;
                                    }
                                }
                                i++;
                            }
                            auxVaccines=null;    // free the variable so all the other vaccines are not stored in the app
                        }
                        
                        if(usr.myPrescriptions.length > 0)
                        {
                            var auxPrescriptions;
                            $.ajax({
                                url: "http://localhost:3000/Prescriptions",
                                type: "get",   
                                async:false,
                                dataType: "json",
                                success:function(pres)
                                {
                                    auxPrescriptions = pres.result;    // Save all the prescriptions retrieved in an auxiliar array
                                }
                            });
                            var myPrescriptions = usr.myPrescriptions;
                            i=0;
                            while(i < myPrescriptions.length)
                            {
                                for(var j=0;j<auxPrescriptions.length;j++)    // For the actual item in myPrescriptions, chek all items of auxPrescriptions
                                {
                                    if(myPrescriptions[i] == auxPrescriptions[j].vid)    // If the curren auxPrescriptions item has the same ID as one of myPrescriptions
                                    {
                                        // Take the dose string and convert it to the variables used in the app
                                        var doseArray = auxPrescriptions[j].dose.split("/");
                                        auxPrescriptions[j].doseTakes=doseArray[0].split(" ")[0];
                                        auxPrescriptions[j].doseTakesMeasure=doseArray[0].split(" ")[1];
                                        auxPrescriptions[j].doseFrequency=doseArray[1].split(" ")[0];
                                        auxPrescriptions[j].doseFrequencyMeasure=doseArray[1].split(" ")[1];
                                        // Delete the previous string
                                        delete auxPrescriptions[j].dose;
                                        if(auxPrescriptions[j].inRecord=="false"){prescriptions.push(auxPrescriptions[j]);}
                                        else{record.push(auxPrescriptions[j]);}
                                        break;
                                    }
                                }
                                i++;
                            }
                            auxPrescriptions=null;    // free the variable so all the other prescriptions are not stored in the app
                        }
                        
                        if(usr.myPhrs.length > 0)
                        {
                            var auxPhrs;
                            $.ajax({
                                url: "http://localhost:3000/Phrs",
                                type: "get",     
                                async:false,
                                dataType: "json",
                                success:function(phrs)
                                {
                                    auxPhrs = phrs.result;    // Save all the PHRs retrieved in an auxiliar array
                                }
                            });
                            var myPhrs = usr.myPhrs;
                            i=0;
                            while(i < myPhrs.length)
                            {
                                for(var j=0;j<auxPhrs.length;j++)    // For the actual item in myPhrs, chek all items of auxPhrs
                                {
                                    if(myPhrs[i] == auxPhrs[j].vid)    // If the curren auxPhrs item has the same ID as one of myPhrs
                                    {
                                        record.push(auxPhrs[j]);
                                        break;
                                    }
                                }
                                i++;
                            }
                            auxPhrs=null;    // free the variable so all the other PHRs are not stored in the app
                        }
                    }
                });
                
                // Sort the arrays before adding the entries
                sortByDate(vaccines);
                saveToLocalStorage(vaccines,"vaccine-list");
                sortByDate(prescriptions);
                saveToLocalStorage(prescriptions,"prescription-list");
                sortByDate(record);
                saveToLocalStorage(record,"record-list");
                
                // Fill the tabs with the entries
                for(var i=0;i<vaccines.length;i++)
                {
                    var newItem = document.createElement("div");
                    newItem.id = vaccines[i].vid;
                    if(i % 2==0)
                    {
                        newItem.className="vaccine-entry-a"; 
                    }
                    else
                    {
                        newItem.className="vaccine-entry-b"; 
                    }                                  
                    var info = document.createElement("div");
                    info.innerHTML=vaccines[i].title;
                    info.className='vaccine-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    d = new Date(vaccines[i].date);
                    info.innerHTML=d.toISOString().split("T")[0]+" "+vaccines[i].time;
                    info.className='vaccine-date';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedVaccine;
                    
                    document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List
                }
                
                for(var j=0; j<prescriptions.length; j++)
                {
                    newItem = document.createElement("div");
                    newItem.id = prescriptions[j].vid;
                    if(j % 2==0)
                    {
                        newItem.className="prescription-entry-a"; 
                    }
                    else
                    {
                        newItem.className="prescription-entry-b"; 
                    } 
                    
                    info = document.createElement("div");
                    info.innerHTML=prescriptions[j].title;
                    info.className='prescription-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    d = new Date(prescriptions[j].date);
                    info.innerHTML=d.toISOString().split("T")[0];
                    info.className='prescription-date';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    if(prescriptions[j].text != "")
                    {
                        info = document.createElement("div");
                        info.innerHTML=prescriptions[j].text;
                        info.className='prescription-text';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                    }
                    
                    newItem.onclick=viewDetailedPrescription;
                    
                    document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List
                }
                
                for(var k=0;k<record.length;k++)
                {
                    newItem = document.createElement("div");
                    info;
                    newItem.id = record[k].vid;
                    switch(record[k].type)
                    {
                        case "vaccine":
                        if(k % 2==0){
                            newItem.className="vaccine-entry-a"; 
                        }
                        else
                        {
                            newItem.className="vaccine-entry-b"; 
                        } 
                        info = document.createElement("div");
                        info.innerHTML=record[k].title;
                        info.className='vaccine-title';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                        
                        info = document.createElement("div");
                        d = new Date(record[k].date);
                        info.innerHTML=d.toISOString().split("T")[0]+" "+record[k].time;
                        info.className='vaccine-date';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                        
                        newItem.onclick=viewDetailedRecordVaccine;
                        
                        document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                        break;
                        
                        case "prescription":
                        if(k % 2==0)
                        {
                            newItem.className="prescription-entry-a"; 
                        }
                        else
                        {
                            newItem.className="prescription-entry-b"; 
                        }   
                        
                        info = document.createElement("div");
                        info.innerHTML=record[k].title;
                        info.className='prescription-title';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                        
                        info = document.createElement("div");
                        d = new Date(record[k].date);
                        info.innerHTML=d.toISOString().split("T")[0];
                        info.className='prescription-date';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                        
                        if(record[k].text != "")
                        {
                            info = document.createElement("div");
                            info.innerHTML=record[k].text;
                            info.className='prescription-text';
                            newItem.appendChild(info);	// Add the TextNode to the ListItem
                        }
                        
                        newItem.onclick=viewDetailedRecordPrescription;
                        
                        document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                        break;
                        
                        case "phr":
                        if(k % 2==0)
                        {
                            newItem.className="phr-entry-a"; 
                        }
                        else
                        {
                            newItem.className="phr-entry-b"; 
                        } 
                        info = document.createElement("div");
                        info.innerHTML=record[k].title;
                        info.className='phr-title';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                        
                        info = document.createElement("div");
                        d = new Date(record[k].date);
                        info.innerHTML=d.toISOString().split("T")[0];
                        info.className='phr-date';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                        
                        info = document.createElement("div");
                        info.innerHTML=record[k].text;
                        info.className='phr-text';
                        newItem.appendChild(info);	// Add the TextNode to the ListItem
                        
                        newItem.onclick=viewDetailedPHR;
                        
                        document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                        break;                   
                    }
                }
                
                document.location.href = "#tabstrip-vaccines";
            },
            error:function(msg)
            {
                if(msg.status=="0")
                {
                    alert("The app couldn't communicate with the server, please try again later.");
                }
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

function logout()
{
    if(requests.length > 0)
    {
        var res = confirm("There are changes that have not been synchronized with the server. Do you really want to log out?");
        if(res == true)
        {
            // Fill the login inputs with the last logged in user e-mail
            document.getElementById("login-user-input").value = window.localStorage.getItem("loginUser");
            document.getElementById("login-password-input").value = "";
            
            // Delete the user credentials in localStorage
            localStorage.removeItem("loginUser");
            localStorage.removeItem("loginPassword");
            localStorage.removeItem("vaccines");
            vaccines.length = 0;
            localStorage.removeItem("prescriptions");
            prescriptions.length = 0;
            localStorage.removeItem("record");
            record.length = 0;
            localStorage.removeItem("requests");
            requests.length = 0;
            
            // Delete the entries in the tabs
            emptyList(document.getElementById("vaccine-list"));
            emptyList(document.getElementById("prescription-list"));
            emptyList(document.getElementById("record-list"));
            
            // Go back to the login screen
            document.location.href = "#login";
        }
    }
    else
    {
        // Fill the login inputs with the last logged in user e-mail
        document.getElementById("login-user-input").value = window.localStorage.getItem("loginUser");
        document.getElementById("login-password-input").value = "";
        
        // Delete the user credentials in localStorage
        localStorage.removeItem("loginUser");
        localStorage.removeItem("loginPassword");
        localStorage.removeItem("vaccines");
        vaccines.length = 0;
        localStorage.removeItem("prescriptions");
        prescriptions.length = 0;
        localStorage.removeItem("record");
        record.length = 0;
        localStorage.removeItem("requests");
        requests.length = 0;
        
        // Delete the entries in the tabs
        emptyList(document.getElementById("vaccine-list"));
        emptyList(document.getElementById("prescription-list"));
        emptyList(document.getElementById("record-list"));
        
        // Go back to the login screen
        document.location.href = "#login";
    }
}

function register()
{
    var mail = document.getElementById("login-user-input").value;
    var password = document.getElementById("login-password-input").value;
    var jsonObject;
    if(mail == "" && password == "")
    {
        highlightInputError("login-user-input");
        highlightInputError("login-password-input");
        alert("Enter the required fields before registering.");
    }
    else if(mail == "")
    {
        highlightInputError("login-user-input");
        alert("An e-mail is required for registering.");
    }
    else if(password == "")
    {
        highlightInputError("login-password-input");
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
                    success:function(msg)
                    {
                        localStorage.setItem("loginUser", mail);
                        localStorage.setItem("loginPassword", password);    
                        localStorage.setItem("userId",msg.userId);
                        document.getElementById("options-user-input").value = mail;
                        document.getElementById("options-password-input").value = password;
                        document.location.href = "#tabstrip-vaccines";
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
