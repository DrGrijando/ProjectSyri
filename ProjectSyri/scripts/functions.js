var isVaccineTabSelected = true;
var user;
var password;
var currentElementID;
var currentElementList;
var d = new Date();

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION */

function addNewVaccine() {
    currentElementList = "vaccine-list";
    var title = document.getElementById("new-vaccine-title").value;
    var date = document.getElementById("new-vaccine-date").value;
    var time = document.getElementById("new-vaccine-time").value;
    
    if (title == "" || date == "") {
        alert("Enter all the information before saving the data.");
    } else {
        var newItem = document.createElement("div");
        var vid = title.substring(0, 3).concat(date).replace(/-| /g, '');
        newItem.id = vid;        
        if (vaccines.length % 2 == 0) {
            newItem.className = "vaccine-entry-a"; 
        } else {
            newItem.className = "vaccine-entry-b"; 
        }                  
        
        var info = document.createElement("div");
        info.innerHTML = title;
        info.className = 'vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = date + " " + time;
        info.className = 'vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedVaccine;
                
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Set the notification for this vaccine
        /*
        var msg = "Vaccine for "+title+" at "+time;
        var year=date.split("-")[0],
        month=(date.split("-")[1])-1,
        day=date.split("-")[2];
        var hours, minutes;
        if(document.getElementById("new-vaccine-notification-time-measure").value=="minute")
        {
        hours=time.split(":")[0];
        minutes=(time.split(":")[1])-(document.getElementById("new-vaccine-notification-time").value);
        }
        else
        {
        hours=time.split(":")[0]-(document.getElementById("new-vaccine-notification-time").value);
        minutes=time.split(":")[1];            
        }        
        
        d = new Date(year,month,day,hours,minutes);
        window.plugin.notification.local.add({
        id : vid,
        title : "Vaccination today",
        message : msg,
        date : d,
        sound : "TYPE_NOTIFICATION"
        });
        */
        // Store the new vaccine in the localStorage        
        var vaccineToStore = {"title":title,"date":date,"time":time,"vid":vid,"type":"vaccine"}
        vaccines.push(vaccineToStore);
        sortByDate(vaccines);
        saveToLocalStorage(vaccines);
        updateVaccineList();
        
        // Save the info for later POST request
        var req = {
            url : "http://localhost:3000/Vaccine",
            reqType : "post",
            entry : vaccineToStore
        };        
        requests.push(req);
        saveToLocalStorage(requests,"requests");
        
        goBack();
        
        // Reset the inputs
        d = new Date();
        document.getElementById("new-vaccine-title").value = "";
        document.getElementById("new-vaccine-date").value = d.toISOString().split("T")[0];
        document.getElementById("new-vaccine-time").value = d.getHours() + ":" + d.getMinutes();
    }    
}

function addNewPrescription() {
    currentElementList = "prescription-list";
    var title = document.getElementById("new-prescription-title").value;
    var date = document.getElementById("new-prescription-date").value;
    var finalDate = document.getElementById("new-prescription-final-date").value;
    var doseTakes = document.getElementById("new-prescription-dose-takes").value;
    var doseTakesMeasure = document.getElementById("new-prescription-dose-takes-measure").value;
    var doseFrequency = document.getElementById("new-prescription-dose-frequency").value;
    var doseFrequencyMeasure = document.getElementById("new-prescription-dose-frequency-measure").value;
    var text = document.getElementById("new-prescription-text").value;
    
    if (title == "" || date == "" || finalDate == "" || doseTakes == "" || doseTakesMeasure == "" || doseFrequency == "" || doseFrequencyMeasure == "" || text == "") {
        alert("Enter all the information before saving the data.");
    } else {
        var newItem = document.createElement("div");
        var vid = title.substring(0, 3).concat(date).replace(/-| /g, '');
        newItem.id = vid;
        if (prescriptions.length % 2 == 0) {
            newItem.className = "prescription-entry-a"; 
        } else {
            newItem.className = "prescription-entry-b"; 
        }
        
        var info = document.createElement("div");
        info.innerHTML = title;
        info.className = 'prescription-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = date;
        info.className = 'prescription-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
                
        info = document.createElement("div");
        info.innerHTML = text;
        info.className = 'prescription-text';
        newItem.appendChild(info);	// Add the TextNode to the ListItem   
        
        newItem.onclick = viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
        
        // Store the new prescription in the localStorage
        
        var prescriptionToStore = {
            "title":title,"date":date,"finalDate":finalDate,"doseTakes":doseTakes,
            "doseTakesMeasure":doseTakesMeasure,"doseFrequency":doseFrequency,
            "doseFrequencyMeasure":doseFrequencyMeasure,"text":text,"vid":vid,"type":"prescription"
        }
        prescriptions.push(prescriptionToStore);
        sortByDate(prescriptions);
        saveToLocalStorage(prescriptions);
        updatePrescriptionList();
        
        // Save the info for later POST request
        var req = {
            url : "http://localhost:3000/Prescription",
            reqType : "post",
            entry : prescriptionToStore
        };        
        requests.push(req);
        saveToLocalStorage(requests,"requests");
        
        goBack();
        
        // Reset the inputs
        document.getElementById("new-prescription-title").value = "";
        document.getElementById("new-prescription-date").value = d.toISOString().split("T")[0];
        document.getElementById("new-prescription-final-date").value = "";
        document.getElementById("new-prescription-text").value = "";
        document.getElementById("new-prescription-dose-takes").value = "";
        document.getElementById("new-prescription-dose-takes-measure").value = "pill(s)";
        document.getElementById("new-prescription-dose-frequency").value = "";
        document.getElementById("new-prescription-dose-frequency-measure").value = "hour(s)";        
    }
}

function addNewPHR() {
    currentElementList = "record-list";
    var title = document.getElementById("new-phr-title").value;
    var date = document.getElementById("new-phr-date").value;
    var text = document.getElementById("new-phr-text").value;
    if (title == "" || date == "" || text == "") {
        alert("Enter all the information before saving the data.");
    } else {
        var newItem = document.createElement("div");
        var vid = title.substring(0, 3).concat(date).replace(/-| /g, '');
        newItem.id = vid;
        if (record.length % 2 == 0) {
            newItem.className = "phr-entry-a"; 
        } else {
            newItem.className = "phr-entry-b"; 
        }
        
        var info = document.createElement("div");
        info.innerHTML = title;
        info.className = 'phr-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = date;
        info.className = 'phr-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = text;
        info.className = 'phr-text';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedPHR;
        
        document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Store the new PHR in the localStorage
        
        var phrToStore = {"title":title,"date":date,"text":text,"vid":vid,"type":"phr"}
        record.push(phrToStore);
        sortByDate(record);
        saveToLocalStorage(record);    
        updateRecordList();
        
        // Save the info for later POST request
        var req = {
            url : "http://localhost:3000/Phr",
            reqType : "post",
            entry : phrToStore
        };        
        requests.push(req);
        saveToLocalStorage(requests,"requests");
        
        goBack();
        
        // Reset the inputs
        document.getElementById("new-phr-title").value = "";
        document.getElementById("new-phr-date").value = d.toISOString().split("T")[0];
        document.getElementById("new-phr-text").value = "";
    }    
}

function login() {
    user = localStorage.getItem("loginUser");
    password = localStorage.getItem("loginPassword");
    
    if ((user == null) || (password == null)) {
        user = document.getElementById("login-user-input").value;
        password = document.getElementById("login-password-input").value;
        
        if ((user == "") && (password == "")) {
            document.getElementById("login-user-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Information missing.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        } else if (user == "") {
            document.getElementById("login-user-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        } else if (password == "") {
            document.getElementById("login-password-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        } else {
            window.localStorage.setItem("loginUser", document.getElementById("login-user-input").value);
            window.localStorage.setItem("loginPassword", document.getElementById("login-password-input").value);    
            document.location.href = "#tabstrip-vaccines";
        }
    } else {
        if ((user == document.getElementById("login-user-input").value) && (password == document.getElementById("login-password-input").value)) {
            document.location.href = "#tabstrip-vaccines";
        } else if ((document.getElementById("login-user-input").value == "") && (document.getElementById("login-password-input").value == "")) {
            document.getElementById("login-user-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-password-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Information missing.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";
        } else if (document.getElementById("login-user-input").value == "") {
            document.getElementById("login-user-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Please, enter your user email before proceeding.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        } else if (document.getElementById("login-password-input").value == "") {
            document.getElementById("login-password-input").style.cssText = "background-color:rgb(255,128,128) !important;-webkit-transition: background-color 500ms linear;";
            document.getElementById("login-error-text").innerHTML = "Please, enter your password before proceeding.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        } else {
            document.getElementById("login-error-text").innerHTML = "Wrong user name and/or password. Please, try again.";
            document.getElementById("login-error-text").style.cssText = "text-align: center;color:rgb(88,220,145) !important;-webkit-transition: background-color 3000ms linear;";            
        }
    }
}

function loadData() {
    user = localStorage.getItem("loginUser");
    password = localStorage.getItem("loginPassword");
    
    if ((user != null) && (password != null)) {
        document.getElementById("login-user-input").value = user;
        document.getElementById("options-user-input").value = user;
        document.getElementById("login-password-input").value = password;
        document.getElementById("options-password-input").value = password;
    }
    var isChecked = (localStorage.getItem("settings")==="true");
    if (isChecked) {
        document.getElementById("confirm-deletions-checkbox").checked = true;
    } else { 
        document.getElementById("confirm-deletions-checkbox").checked = false;
    }    
}

function resetInputBackground() {
    document.getElementById(window.event.srcElement.id).style.cssText = "background-color:transparent !important;-webkit-transition: background-color 500ms linear;";
}

function deleteLoginInfo() {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginPassword");
    alert("User and password deleted.");
}

function viewDetailedVaccine() {
    currentElementList = window.event.srcElement.parentElement.parentElement.id;    
    for (var i = 0;i < vaccines.length;i++) {
        //var v=JSON.parse(vaccines[i]);
        if (vaccines[i].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-vaccine-title").value = vaccines[i].title;
            document.getElementById("detailed-vaccine-date").value = vaccines[i].date;
            document.getElementById("detailed-vaccine-time").value = vaccines[i].time;
            currentElementID = vaccines[i].vid;
            break;
        }
    }     
    document.location.href = "#detailed-vaccine-view";    
}

function viewDetailedPrescription() {
    currentElementList = window.event.srcElement.parentElement.parentElement.id;
    for (var j = 0;j < prescriptions.length;j++) {
        //var p=JSON.parse(prescriptions[j]);
        if (prescriptions[j].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-prescription-title").value = prescriptions[j].title;
            document.getElementById("detailed-prescription-date").value = prescriptions[j].date;
            document.getElementById("detailed-prescription-final-date").value = prescriptions[j].finalDate;            
            document.getElementById("detailed-prescription-text").value = prescriptions[j].text;
            document.getElementById("detailed-prescription-dose-takes").value = prescriptions[j].doseTakes;
            document.getElementById("detailed-prescription-dose-takes-measure").value = prescriptions[j].doseTakesMeasure;
            document.getElementById("detailed-prescription-dose-frequency").value = prescriptions[j].doseFrequency;
            document.getElementById("detailed-prescription-dose-frequency-measure").value = prescriptions[j].doseFrequencyMeasure;
            currentElementID = prescriptions[j].vid;            
            break;
        }
    } 
    document.location.href = "#detailed-prescription-view";
}

function viewDetailedPHR() {
    currentElementList = window.event.srcElement.parentElement.parentElement.id;
    
    for (var k = 0;k < record.length;k++) {
        //var p=JSON.parse(record[k]);
        if (record[k].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-phr-title").value = record[k].title;
            document.getElementById("detailed-phr-date").value = record[k].date;
            document.getElementById("detailed-phr-text").value = record[k].text;
            currentElementID = record[k].vid;
            break;
        }
    } 
    document.location.href = "#detailed-phr-view";
}

function viewDetailedRecordVaccine() {
    currentElementList = window.event.srcElement.parentElement.parentElement.id;
    for (var i = 0;i < record.length;i++) {
        //var v=JSON.parse(vaccines[i]);
        if (record[i].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-record-vaccine-title").value = record[i].title;
            document.getElementById("detailed-record-vaccine-date").value = record[i].date;
            document.getElementById("detailed-record-vaccine-time").value = record[i].time;
            currentElementID = record[i].vid;
            break;
        }
    }     
    document.location.href = "#detailed-record-vaccine-view";    
}

function viewDetailedRecordPrescription() {
    currentElementList = window.event.srcElement.parentElement.parentElement.id;    
    for (var j = 0;j < record.length;j++) {
        //var p=JSON.parse(prescriptions[j]);
        if (record[j].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-record-prescription-title").value = record[j].title;
            document.getElementById("detailed-record-prescription-date").value = record[j].date;
            document.getElementById("detailed-record-prescription-final-date").value = record[j].finalDate;            
            document.getElementById("detailed-record-prescription-text").value = record[j].text;
            document.getElementById("detailed-record-prescription-dose-takes").value = record[j].doseTakes;
            document.getElementById("detailed-record-prescription-dose-takes-measure").value = record[j].doseTakesMeasure;
            document.getElementById("detailed-record-prescription-dose-frequency").value = record[j].doseFrequency;
            document.getElementById("detailed-record-prescription-dose-frequency-measure").value = record[j].doseFrequencyMeasure;
            currentElementID = record[j].vid;            
            break;
        }
    } 
    document.location.href = "#detailed-record-prescription-view";
}

function deleteElement() {
    var i = 0;
    var isChecked = document.getElementById("confirm-deletions-checkbox").checked;
    if (isChecked) {
        if (confirm("Are you sure you want to delete this entry?")) {
            switch (currentElementList) {
                case "vaccine-list":                       
                    while (i < vaccines.length) {
                        if (currentElementID == vaccines[i].vid) {
                            vaccines.splice(i, 1);
                            
                            // Save the info for later DELETE request
                            var req = {
                                url : "http://localhost:3000/Vaccine/"+currentElementID,
                                reqType : "delete"
                            };        
                            requests.push(req);                            
                            saveToLocalStorage(requests,"requests");
                            
                            break;
                        }
                        i++;
                    }
                    saveToLocalStorage(vaccines);
                    updateVaccineList();
                    break;
                case "prescription-list":
                    while (i < prescriptions.length) {
                        if (currentElementID == prescriptions[i].vid) {
                            prescriptions.splice(i, 1);
                            
                            // Save the info for later DELETE request
                            var req = {
                                url : "http://localhost:3000/Prescription/"+currentElementID,
                                reqType : "delete"
                            };        
                            requests.push(req); 
                            saveToLocalStorage(requests,"requests");
                            
                            break;
                        }
                        i++;
                    }
                    saveToLocalStorage(prescriptions);
                    updatePrescriptionList();
                    break;
                case "record-list":
                    while (i < record.length) {
                        if (currentElementID == record[i].vid) {
                            // Save the info for later DELETE request
                            switch(record[i].type){
                                case "vaccine":
                                    var req = {
                                        url : "http://localhost:3000/Vaccine/"+currentElementID,
                                        reqType : "delete"
                                    };  
                                    requests.push(req); 
                                    saveToLocalStorage(requests,"requests");
                                
                                    break;
                                
                                case "prescription":
                                    var req = {
                                        url : "http://localhost:3000/Prescription/"+currentElementID,
                                        reqType : "delete"
                                    };  
                                    requests.push(req);
                                    saveToLocalStorage(requests,"requests");
                                
                                    break;
                                
                                case "phr":
                                    var req = {
                                        url : "http://localhost:3000/Phr/"+currentElementID,
                                        reqType : "delete"
                                    };  
                                    requests.push(req);
                                    saveToLocalStorage(requests,"requests");
                                
                                    break;
                            }
                            record.splice(i, 1);
                            break;
                        }
                        i++;
                    }       
                    saveToLocalStorage(record);
                    updateRecordList();
                    break;
            }
            goBack();
        }
    } else {
        switch (currentElementList) {
            case "vaccine-list":                       
                while (i < vaccines.length) {
                    if (currentElementID == vaccines[i].vid) {
                        var req = {
                            url : "http://localhost:3000/Vaccine/"+currentElementID,
                            reqType : "delete"
                        };  
                        requests.push(req); 
                        saveToLocalStorage(requests,"requests");
                        
                        vaccines.splice(i, 1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(vaccines);
                updateVaccineList();
                break;
            case "prescription-list":
                while (i < prescriptions.length) {
                    if (currentElementID == prescriptions[i].vid) {
                        var req = {
                            url : "http://localhost:3000/Prescription/"+currentElementID,
                            reqType : "delete"
                        }; 
                        
                        prescriptions.splice(i, 1);
                        break;
                    }
                    i++;
                }
                saveToLocalStorage(prescriptions);
                updatePrescriptionList();
                break;
            case "record-list":
                while (i < record.length) {
                    if (currentElementID == record[i].vid) {
                        switch (record[i].type) 
                        {
                            case "vaccine":
                                var req = {
                                    url : "http://localhost:3000/Vaccine/" + currentElementID,
                                    reqType : "delete"
                                };  
                                requests.push(req); 
                                saveToLocalStorage(requests,"requests");
                            
                                break;
                            
                            case "prescription":
                                var req = {
                                    url : "http://localhost:3000/Prescription/" + currentElementID,
                                    reqType : "delete"
                                };  
                                requests.push(req);
                                saveToLocalStorage(requests,"requests");
                            
                                break;
                            
                            case "phr":
                                var req = {
                                    url : "http://localhost:3000/Phr/" + currentElementID,
                                    reqType : "delete"
                                };  
                                requests.push(req);
                                saveToLocalStorage(requests,"requests");
                            
                                break;
                        }
                       record.splice(i, 1);
                       break;
                    }
                    i++;
                }       
                saveToLocalStorage(record);
                updateRecordList();
                break;
        }
        goBack();
    }    
}

function updateVaccineList() {    
    emptyList(document.getElementById("vaccine-list"));
    for (var i = 0;i < vaccines.length;i++) 
    {        
        var newItem = document.createElement("div");
        newItem.id = vaccines[i].vid;        
        if (i % 2 == 0) {
            newItem.className = "vaccine-entry-a"; 
        } else {
            newItem.className = "vaccine-entry-b"; 
        }                         
        var info = document.createElement("div");
        info.innerHTML = vaccines[i].title
        info.className = 'vaccine-title';
        newItem.appendChild(info);  // Add the TextNode to the ListItem                      
        
        info = document.createElement("div");
        info.innerHTML = vaccines[i].date + " " + vaccines[i].time;
        info.className = 'vaccine-date';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedVaccine
        
        document.getElementById("vaccine-list").appendChild(newItem);   // Add the div to the specified List
    }
}

function updatePrescriptionList() {
    emptyList(document.getElementById("prescription-list"));
    for (var j = 0; j < prescriptions.length; j++) 
    {
        var newItem = document.createElement("div");
        newItem.id = prescriptions[j].vid;
        if (j % 2 == 0) {
            newItem.className = "prescription-entry-a"; 
        } else {
            newItem.className = "prescription-entry-b"; 
        }        
        var info = document.createElement("div");
        info.innerHTML = prescriptions[j].title;
        info.className = 'prescription-title';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = prescriptions[j].date;
        info.className = 'prescription-date';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = prescriptions[j].text;
        info.className = 'prescription-text';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);  // Add the div to the specified List
    }
}

function updateRecordList() {
    emptyList(document.getElementById("record-list"));
    for (var k = 0;k < record.length;k++) 
    {
        var newItem = document.createElement("div");
        var info;
        newItem.id = record[k].vid;
        switch (record[k].type) {
            case "vaccine":
                if (k % 2 == 0) {
                    newItem.className = "vaccine-entry-a"; 
                } else {
                    newItem.className = "vaccine-entry-b"; 
                }     
                info = document.createElement("div");
                info.innerHTML = record[k].title;
                info.className = 'vaccine-title';
                newItem.appendChild(info);  // Add the TextNode to the ListItem                      
                    
                info = document.createElement("div");
                info.innerHTML = record[k].date + " " + record[k].time;
                info.className = 'vaccine-date'
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                newItem.onclick = viewDetailedRecordVaccine;
                    
                document.getElementById("record-list").appendChild(newItem);   // Add the div to the specified List
                break;
            case "prescription":
                if (k % 2 == 0) {
                    newItem.className = "prescription-entry-a"; 
                } else {
                    newItem.className = "prescription-entry-b"; 
                }
                info = document.createElement("div");
                info.innerHTML = record[k].title;
                info.className = 'prescription-title';
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                info = document.createElement("div");
                info.innerHTML = record[k].date;
                info.className = 'prescription-date';
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                info = document.createElement("div");
                info.innerHTML = record[k].text;
                info.className = 'prescription-text';
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                newItem.onclick = viewDetailedRecordPrescription;
                    
                document.getElementById("record-list").appendChild(newItem);  // Add the div to the specified List
                break;
            case "phr":
                if (k % 2 == 0) {
                    newItem.className = "phr-entry-a"; 
                } else {
                    newItem.className = "phr-entry-b"; 
                }
            
                info = document.createElement("div");
                info.innerHTML = record[k].title;
                info.className = 'phr-title';
                newItem.appendChild(info);  // Add the TextNode to the ListItem                      
                    
                info = document.createElement("div");
                info.innerHTML = record[k].date;
                info.className = 'phr-date'
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                info = document.createElement("div");
                info.innerHTML = record[k].text;
                info.className = 'phr-text'
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                    
                newItem.onclick = viewDetailedPHR;
                    
                document.getElementById("record-list").appendChild(newItem);    // Add the div to the specified List                    
                break;     
        }
    }
}

function emptyList(list) {
    var i = 0;
    while (i < list.childNodes.length) {
        if (list.childNodes[i].tagName == "DIV") {
            list.removeChild(list.childNodes[i]);
        } else {
            i++;
        }
    }
}

function saveToLocalStorage(arrayToSave, targetList) {
    // IF IT IS NOT SPECIFIED, THE KEY USED FOR THE LOCALSTORAGE WILL BE THE ONE RELATED TO THE
    // CURRENT LIST (IT SHOULD BE SPECIFIED WHEN USER IS MOVING AN ELEMENT TO THE RECORD TAB)
    if (typeof(targetList)==='undefined')
        targetList = currentElementList;
    
    var str = "";
    for (var i = 0;i < arrayToSave.length;i++) {
        if (i == (arrayToSave.length - 1)) {
            str = str + JSON.stringify(arrayToSave[i]);
        } else {
            str = str + JSON.stringify(arrayToSave[i]) + "+";            
        }
    }
    
    switch (targetList) {
        case "vaccine-list":
            
            if (str != "") {
                localStorage.setItem("vaccines", str);
            } else {
                localStorage.removeItem("vaccines");
            }            
            break;
        case "prescription-list":
            if (str != "") {
                localStorage.setItem("prescriptions", str);
            } else {
                localStorage.removeItem("prescriptions");
            }            
            break;
        case "record-list":
            if (str != "") {
                localStorage.setItem("record", str);
            } else {
                localStorage.removeItem("record");
            }            
            break;
        case "requests":
            if (str != "") {
                localStorage.setItem("requests", str);
            } else {
                localStorage.removeItem("requests");
            }            
            break;
    }
}

function moveToVaccines() {
    var i = 0;
    while (i < record.length) {
        if (currentElementID == record[i].vid) {
            vaccines.push(record[i]);                
            record.splice(i, 1);
            break;
        }
        i++;
    }
    sortByDate(vaccines);
    saveToLocalStorage(vaccines, "vaccine-list");
    saveToLocalStorage(record, "record-list");
    updateVaccineList();
    updateRecordList();
    goBack()
}

function moveToPrescriptions()
{
    var i = 0;
    while (i < record.length)
    {
        if (currentElementID == record[i].vid)
        {
            prescriptions.push(record[i]);                
            record.splice(i, 1);
            break;
        }
        i++;
    }
    sortByDate(prescriptions);
    saveToLocalStorage(prescriptions, "prescription-list");
    saveToLocalStorage(record, "record-list");
    updatePrescriptionList();
    updateRecordList();
    goBack()
}

function moveToRecord()
{
    var i = 0;
    switch (currentElementList)
    {
        case "vaccine-list":            
            while (i < vaccines.length)
            {
                if (currentElementID == vaccines[i].vid)
                {
                    record.push(vaccines[i]);                
                    vaccines.splice(i, 1);
                    break;
                }
                i++;
            }
            sortByDate(record);
            saveToLocalStorage(vaccines);
            saveToLocalStorage(record, "record-list");
            updateVaccineList();
            updateRecordList();
            break;
        case "prescription-list":
            while (i < prescriptions.length)
            {
                if (currentElementID == prescriptions[i].vid)
                {
                    record.push(prescriptions[i]);
                    prescriptions.splice(i, 1);
                    break;
                }
                i++;
            }
            sortByDate(record);
            saveToLocalStorage(prescriptions);
            saveToLocalStorage(record, "record-list");
            updatePrescriptionList();
            updateRecordList();            
            break;
    }
    goBack();
}

function saveElementChanges() {
    var i = 0;
    switch (currentElementList) {
        case "vaccine-list":                       
            while (i < vaccines.length) {
                if (currentElementID == vaccines[i].vid) {
                    // Cancel the previous notification
               //     window.plugin.notification.local.cancel(vaccines[i].vid);
                
                    vaccines[i].title = document.getElementById("detailed-vaccine-title").value;
                    vaccines[i].date = document.getElementById("detailed-vaccine-date").value;
                    vaccines[i].time = document.getElementById("detailed-vaccine-time").value;
                
                    // Set the new notification
             /*       var msg = "Vaccine for " + vaccines[i].title + " at " + vaccines[i].time;
                    var year = vaccines[i].date.split("-")[0],
                        month = (vaccines[i].date.split("-")[1]) - 1,
                        day = vaccines[i].date.split("-")[2],
                        hours = vaccines[i].time.split(":")[0],
                        minutes = vaccines[i].time.split(":")[1];
               
                    d = new Date(year, month, day, hours, minutes)
                    window.plugin.notification.local.add({
                                                             id : vaccines[i].vid,
                                                             title : "Vaccination today",
                                                             message : msg,
                                                             date : d,
                                                             sound : "TYPE_NOTIFICATION"
                                                         });
                  */  
                    // Save the info for later PUT request
                    var req = {
                        url : "http://localhost:3000/Vaccine/"+currentElementID,
                        reqType : "put",
                        entry : vaccines[i]
                    };        
                    requests.push(req);
                    saveToLocalStorage(requests,"requests");
                
                    d = new Date();
                    
                    break;
                }
                i++;
            }
            sortByDate(vaccines);
            saveToLocalStorage(vaccines);
            updateVaccineList();
            break;
        case "prescription-list":
            while (i < prescriptions.length) {
                if (currentElementID == prescriptions[i].vid) {
                    prescriptions[i].title = document.getElementById("detailed-prescription-title").value;
                    prescriptions[i].date = document.getElementById("detailed-prescription-date").value;
                    prescriptions[i].finalDate = document.getElementById("detailed-prescription-final-date").value;
                    prescriptions[i].text = document.getElementById("detailed-prescription-text").value;
                    prescriptions[i].doseTakes = document.getElementById("detailed-prescription-dose-takes").value;
                    prescriptions[i].doseTakesMeasure = document.getElementById("detailed-prescription-dose-takes-measure").value;
                    prescriptions[i].doseFrequency = document.getElementById("detailed-prescription-dose-frequency").value;
                    prescriptions[i].doseFrequencyMeasure = document.getElementById("detailed-prescription-dose-frequency-measure").value;
                    
                    // Save the info for later PUT request
                    var req = {
                        url : "http://localhost:3000/Prescription/"+currentElementID,
                        reqType : "put",
                        entry : prescriptions[i]
                    };        
                    requests.push(req);
                    saveToLocalStorage(requests,"requests");
                
                    d = new Date();
                    
                    break;
                }
                i++;
            }
            sortByDate(prescriptions);
            saveToLocalStorage(prescriptions);
            updatePrescriptionList();
            break;
        case "record-list":
            while (i < record.length) {
                if (currentElementID == record[i].vid) {
                    switch (record[i].type) {
                        case "vaccine":                    
                            // Cancel the previous notification
                            //window.plugin.notification.local.cancel(record[i].vid);
                    
                            record[i].title = document.getElementById("detailed-record-vaccine-title").value;
                            record[i].date = document.getElementById("detailed-record-vaccine-date").value;
                            record[i].time = document.getElementById("detailed-record-vaccine-time").value;
                        
                            // Save the info for later PUT request
                            var req = {
                                url : "http://localhost:3000/Vaccine/"+currentElementID,
                                reqType : "put",
                                entry : record[i]
                            };        
                            requests.push(req);   
                            saveToLocalStorage(requests,"requests");
                        
                            break;             
                        
                        case "prescription":
                            record[i].title = document.getElementById("detailed-record-prescription-title").value;
                            record[i].date = document.getElementById("detailed-record-prescription-date").value;
                            record[i].finalDate = document.getElementById("detailed-record-prescription-final-date").value;
                            record[i].text = document.getElementById("detailed-record-prescription-text").value;
                            record[i].doseTakes = document.getElementById("detailed-record-prescription-dose-takes").value;
                            record[i].doseTakesMeasure = document.getElementById("detailed-record-prescription-dose-takes-measure").value;
                            record[i].doseFrequency = document.getElementById("detailed-record-prescription-dose-frequency").value;
                            record[i].doseFrequencyMeasure = document.getElementById("detailed-record-prescription-dose-frequency-measure").value;
                        
                            // Save the info for later PUT request
                            var req = {
                                url : "http://localhost:3000/Prescription/"+currentElementID,
                                reqType : "put",
                                entry : record[i]
                            };        
                            requests.push(req);
                        
                            break;
                        case "phr":
                            record[i].title = document.getElementById("detailed-phr-title").value;
                            record[i].date = document.getElementById("detailed-phr-date").value;
                            record[i].text = document.getElementById("detailed-phr-text").value;
                        
                            // Save the info for later PUT request
                            var req = {
                                url : "http://localhost:3000/Phr/"+currentElementID,
                                reqType : "put",
                                entry : record[i]
                            };        
                            requests.push(req);
                        
                            break;
                    }
                    break;
                }
                i++;
            }       
            sortByDate(record);
            saveToLocalStorage(record);
            updateRecordList();
            break;
    }
    goBack();
}

function sortByDate(entries) {
    entries.sort(function compare(ent1, ent2) {
        if (ent1.date < ent2.date) {
            return -1;
        }
        if (ent1.date > ent2.date) {
            return 1;
        }
        return 0;
    });
}

function test()
{
    /*
    var v1={"title":"caca","date":"2014-09-09"}
    localStorage.setItem("vaccines",JSON.stringify(v1));
    v1={"title":"pipi","date":"2015-11-25"}
    var str=localStorage.getItem("vaccines")+"+"+JSON.stringify(v1);
    localStorage.setItem("vaccines",str);
    var vector=localStorage.getItem("vaccines").split("+");
    */
}

function saveSettings()
{
    localStorage.setItem("loginUser", document.getElementById("options-user-input").value);
    localStorage.setItem("loginPassword", document.getElementById("options-password-input").value);
    localStorage.setItem("settings", document.getElementById("confirm-deletions-checkbox").checked);
    goBack();
}

function synchronize()
{
    for(var i=0;i<requests.length;i++)
    {
        $.ajax({
        url: requests[i].url,
        type: requests[i].reqType,
        dataType: "json",
        data:requests[i].entry
        });
    }
    // Empty the array after all requests are done
    requests.length=0;
}

function goBack()
{
    window.history.go(-1);
}