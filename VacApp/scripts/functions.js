var currentElementID;
var currentElementList;
var d = new Date();
var isOnline=true;

function showSpinner()
{
    
}

function loadSpinner()
{
    document.location.href = "#spinner-view";        
    setTimeout(function(){synchronize()},200);
}

function onLoad() 
{   
    user = localStorage.getItem("loginUser");
    password = localStorage.getItem("loginPassword");
    
    if ((user != null) && (password != null)) {
        document.getElementById("login-user-input").value = user;
        document.getElementById("options-user-input").value = user;
        document.getElementById("login-password-input").value = password;
        
        document.location.href = "#tabstrip-vaccines";
    }    
    var isChecked = (localStorage.getItem("settings")==="true");
    if (isChecked) {
        document.getElementById("confirm-deletions-checkbox").checked = true;
    } else { 
        document.getElementById("confirm-deletions-checkbox").checked = false;
    }    
}

function resetInputBackground()
{
    document.getElementById(window.event.srcElement.id).style.cssText = "background-color:transparent !important;-webkit-transition: background-color 500ms linear;";
}

function deleteElement()
{
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
                                url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
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
                                url : "http://192.168.1.129:3000/Prescription/"+currentElementID,    // IP TO CHANGE
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
                                        url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
                                        reqType : "delete"
                                    };  
                                    requests.push(req); 
                                    saveToLocalStorage(requests,"requests");
                                
                                    break;
                                
                                case "prescription":
                                    var req = {
                                        url : "http://192.168.1.129:3000/Prescription/"+currentElementID,
                                        reqType : "delete"
                                    };  
                                    requests.push(req);
                                    saveToLocalStorage(requests,"requests");
                                
                                    break;
                                
                                case "phr":
                                    var req = {
                                        url : "http://192.168.1.129:3000/Phr/"+currentElementID,    // IP TO CHANGE
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
            // This line will enable the cloud button if it is disabled
            if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
            goBack();
        }
    } else {
        switch (currentElementList) {
            case "vaccine-list":                       
                while (i < vaccines.length) {
                    if (currentElementID == vaccines[i].vid) {
                        var req = {
                            url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
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
                            url : "http://192.168.1.129:3000/Prescription/"+currentElementID,    // IP TO CHANGE
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
                                    url : "http://192.168.1.129:3000/Vaccine/" + currentElementID,    // IP TO CHANGE
                                    reqType : "delete"
                                };  
                                requests.push(req); 
                                saveToLocalStorage(requests,"requests");
                            
                                break;
                            
                            case "prescription":
                                var req = {
                                    url : "http://192.168.1.129:3000/Prescription/" + currentElementID,    // IP TO CHANGE
                                    reqType : "delete"
                                };  
                                requests.push(req);
                                saveToLocalStorage(requests,"requests");
                            
                                break;
                            
                            case "phr":
                                var req = {
                                    url : "http://192.168.1.129:3000/Phr/" + currentElementID,    // IP TO CHANGE
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
        // This line will enable the cloud button if it is disabled
        if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
        goBack();
    }    
}

function emptyList(list)
{
    var i = 0;
    if(list.childNodes)
    {
        while (i < list.childNodes.length)
        {
            if (list.childNodes[i].tagName == "DIV") 
            {
                list.removeChild(list.childNodes[i]);
            }
            else
            {
                i++;
            }
        }
    }
}

function saveToLocalStorage(arrayToSave, targetList)
{
    // IF IT IS NOT SPECIFIED, THE KEY USED FOR THE LOCALSTORAGE WILL BE THE ONE RELATED TO THE
    // CURRENT LIST (IT SHOULD BE SPECIFIED WHEN USER IS MOVING AN ELEMENT TO THE RECORD TAB)
    if (typeof(targetList)==='undefined')
        targetList = currentElementList;
    
    str = JSON.stringify(arrayToSave);
    
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
            if (str != "")
            {
                localStorage.setItem("requests", str);
            }
            else
            {
                localStorage.removeItem("requests");
            }            
            break;
    }
}

function test()
{
    /*
    var v1={"title":"test","date":"2014-09-09"}
    localStorage.setItem("vaccines",JSON.stringify(v1));
    v1={"title":"pipi","date":"2015-11-25"}
    var str=localStorage.getItem("vaccines")+"+"+JSON.stringify(v1);
    localStorage.setItem("vaccines",str);
    var vector=localStorage.getItem("vaccines").split("+");
    */
}

function saveElementChanges()
{
    
    var i = 0;
    switch (currentElementList)
    {
        case "vaccine-list":                       
            while (i < vaccines.length)
            {
                if (currentElementID == vaccines[i].vid) 
                {
                    var title = document.getElementById("detailed-vaccine-title").value;
                    var date = new Date(document.getElementById("detailed-vaccine-date").value);
                    var time = document.getElementById("detailed-vaccine-time").value;
                    
                    // Cancel the previous notification
                    // window.plugin.notification.local.cancel(vaccines[i].vid);
                    if (title == "" || date == "" || text == "")
                    {
                        if(title == ""){ highlightInputError("detailed-vaccine-title"); }
                        if(isNaN(date.getTime())){ highlightInputError("detailed-vaccine-date"); }
                        if(time == ""){ highlightInputError("detailed-vaccine-time"); }
                        if(document.getElementById("detailed-vaccine-notification-time").value == ""){ highlightInputError("detailed-vaccine-notification-time"); }        
                        alert(getTranslatedText("Alerta_introducir_info"));
                        break;
                    }
                    else
                    {
                        vaccines[i].title = title;
                        vaccines[i].date = date;
                        vaccines[i].time = time;
                        
                    // Set the new notification
                      /*
                      var msg = "Vaccine for " + vaccines[i].title + " at " + vaccines[i].time;
                        var year = vaccines[i].date.getFullYear(),
                        month = (vaccines[i].date.getMonth()) + 1,
                        day = vaccines[i].date.getDate();
                        var hours, minutes;
                        if(document.getElementById("detailed-vaccine-notification-time-measure").value=="minute")
                        {
                            hours=parseInt(time.split(":")[0]);
                            minutes=parseInt(time.split(":")[1]);
                            val = (hours*60) + minutes - parseInt(document.getElementById("detailed-vaccine-notification-time").value);
                            hours = parseInt(val/60).toString();
                            minutes = (val % 60).toString();
                        }
                        else
                        {
                            hours=parseInt(time.split(":")[0]);
                            minutes=parseInt(time.split(":")[1]);
                            val = (hours*60) + minutes - (parseInt(document.getElementById("detailed-vaccine-notification-time").value)*60);
                            hours = parseInt(val/60).toString();
                            minutes = (val % 60).toString();
                        }  
               
                        d = new Date(year, month, day, hours, minutes)
                        window.plugin.notification.local.add({
                                                             id : vaccines[i].vid,
                                                             title : "Vaccination today",
                                                             message : msg,
                                                             date : d,
                                                             sound : "TYPE_NOTIFICATION"
                        });
                      */
                    /* Save the info for later PUT request */
                        var req = {
                            url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
                            reqType : "put",
                            entry : vaccines[i]
                        };        
                        requests.push(req);
                        saveToLocalStorage(requests,"requests");
                        
                        d = new Date();
                        
                        sortByDate(vaccines);
                        saveToLocalStorage(vaccines);
                        updateVaccineList();
                        // This line will enable the cloud button if it is disabled
                        if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
                        goBack();
                        break;
                    }
                }
                i++;
            }        
            break;
        
        case "prescription-list":
            while (i < prescriptions.length)
            {
                if (currentElementID == prescriptions[i].vid)
                {
                    var title = document.getElementById("detailed-prescription-title").value;
                    var date = new Date(document.getElementById("detailed-prescription-date").value);
                    var finalDate = new Date(document.getElementById("detailed-prescription-final-date").value);
                    var doseTakes = document.getElementById("detailed-prescription-dose-takes").value;
                    var doseTakesMeasure = document.getElementById("detailed-prescription-dose-takes-measure").value;
                    var doseFrequency = document.getElementById("detailed-prescription-dose-frequency").value;
                    var doseFrequencyMeasure = document.getElementById("detailed-prescription-dose-frequency-measure").value;
                    var text = document.getElementById("detailed-prescription-text").value;
                    
                    if (title == "" || date == "" || finalDate == "" || doseTakes == "" || doseFrequency == "")
                    {        
                        if(title==""){ highlightInputError("detailed-prescription-title"); }
                        if(isNaN(date.getTime())){ highlightInputError("detailed-prescription-date"); }        
                        if(isNaN(finalDate.getTime())){ highlightInputError("detailed-prescription-final-date"); }
                        if(doseTakes==""){ highlightInputError("detailed-prescription-dose-takes"); }
                        if(doseFrequency==""){ highlightInputError("detailed-prescription-dose-frequency"); }
                        alert(getTranslatedText("Alerta_introducir_info"));
                        break;
                    }
                    else 
                    {
                        prescriptions[i].title = title;
                        prescriptions[i].date = date;
                        prescriptions[i].finalDate = finalDate;
                        prescriptions[i].text = text;
                        prescriptions[i].doseTakes = doseTakes;
                        prescriptions[i].doseTakesMeasure = doseTakesMeasure;
                        prescriptions[i].doseFrequency = doseFrequency;
                        prescriptions[i].doseFrequencyMeasure = doseFrequencyMeasure;
                        
                        // Save the info for later PUT request
                        var req = {
                            url : "http://192.168.1.129:3000/Prescription/"+currentElementID,    // IP TO CHANGE
                            reqType : "put",
                            entry : prescriptions[i]
                        };        
                        requests.push(req);
                        saveToLocalStorage(requests,"requests");
                        
                        d = new Date();
                        
                        sortByDate(prescriptions);
                        saveToLocalStorage(prescriptions);
                        updatePrescriptionList();
                        // This line will enable the cloud button if it is disabled
                        if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
                        goBack(); 
                        break;
                    }
                }
                i++;
            }        
            break;
        
        case "record-list":
            while (i < record.length) 
            {
                if (currentElementID == record[i].vid) 
                {
                    switch (record[i].type) 
                    {
                        case "vaccine":                    
                            // Cancel the previous notification
                            //window.plugin.notification.local.cancel(record[i].vid);
                    
                            record[i].title = document.getElementById("detailed-record-vaccine-title").value;
                            record[i].date = new Date(document.getElementById("detailed-record-vaccine-date").value);
                            record[i].time = document.getElementById("detailed-record-vaccine-time").value;
                        
                            // Save the info for later PUT request
                            var req = {
                                url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
                                reqType : "put",
                                entry : record[i]
                            };        
                            requests.push(req);   
                            saveToLocalStorage(requests,"requests");
                        
                            break;             
                        
                        case "prescription":
                            record[i].title = document.getElementById("detailed-record-prescription-title").value;
                            record[i].date = new Date(document.getElementById("detailed-record-prescription-date").value);
                            record[i].finalDate = new Date(document.getElementById("detailed-record-prescription-final-date").value);
                            record[i].text = document.getElementById("detailed-record-prescription-text").value;
                            record[i].doseTakes = document.getElementById("detailed-record-prescription-dose-takes").value;
                            record[i].doseTakesMeasure = document.getElementById("detailed-record-prescription-dose-takes-measure").value;
                            record[i].doseFrequency = document.getElementById("detailed-record-prescription-dose-frequency").value;
                            record[i].doseFrequencyMeasure = document.getElementById("detailed-record-prescription-dose-frequency-measure").value;
                        
                            // Save the info for later PUT request
                            var req = {
                                url : "http://192.168.1.129:3000/Prescription/"+currentElementID,    // IP TO CHANGE
                                reqType : "put",
                                entry : record[i]
                            };        
                            requests.push(req);
                        
                            break;
                        
                        case "phr":
                            var title = document.getElementById("detailed-phr-title").value;
                            var date = new Date(document.getElementById("detailed-phr-date").value);
                            var text = document.getElementById("detailed-phr-text").value;
                            if (title == "" || date == "" || text == "") 
                            {
                                if(title == ""){ highlightInputError("detailed-phr-title"); }
                                if(date == ""){ highlightInputError("detailed-phr-date"); }
                                if(text == ""){ highlightInputError("detailed-phr-text"); }
                                alert(getTranslatedText("Alerta_introducir_info"));
                                break;
                            }
                            else 
                            {                                
                                record[i].title = title;
                                record[i].date = date;
                                record[i].text = text;
                        
                            // Save the info for later PUT request
                                var req = {
                                    url : "http://192.168.1.129:3000/Phr/"+currentElementID,    // IP TO CHANGE
                                    reqType : "put",
                                    entry : record[i]
                                };        
                                requests.push(req);  
                                
                                sortByDate(record);
                                saveToLocalStorage(record);
                                updateRecordList();
                                // This line will enable the cloud button if it is disabled
                                if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
                                goBack();
                                break;
                            }
                    }
                    break;
                }
                i++;
            }         
            break;
    }
    //goBack();
}

function sortByDate(entries)
{
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

function saveSettings()
{
    localStorage.setItem("settings", document.getElementById("confirm-deletions-checkbox").checked);
    localStorage.setItem("language", document.getElementById("language-select").value);
    language=document.getElementById("language-select").value;
    languageSelected();
    goBack();
}

function synchronize()
{
    var myVaccines=[];
    var myPrescriptions=[];
    var myPhrs=[];
    
    if(isOnline)
    {
        if(requests.length == 0)
        {
            alert(getTranslatedText("Alerta_sin_cambios"));
            goBack();
        }
        else
        {
            var count = 0;
            document.getElementById("spinner-progress").innerHTML="Requests resolved: "+count+"/"+requests.length;       
            for(var i=0;i<requests.length;i++)
            {
                $.ajax({
                    url: requests[i].url,
                    type: requests[i].reqType,
                    async:false,
                    dataType: "json",
                    data:requests[i].entry,
                    success:function(msg)
                    {
                        //requests.splice(i,1);
                        count++;
                        document.getElementById("spinner-progress").innerHTML="Requests resolved: "+count+"/"+requests.length;
                    }
                });
            }
            // Empty the array after all requests are done
            requests.length=0;
            saveToLocalStorage(requests,"requests");
            
            // Update the user in the database with the vaccines, prescriptions and PHRs they own    
            document.getElementById("spinner-progress").innerHTML="Finishing the synchronization...";
            for (i=0;i < vaccines.length; i++)
            {
                myVaccines.push(vaccines[i].vid);
            }
            
            for (i=0;i < prescriptions.length; i++)
            {
                myPrescriptions.push(prescriptions[i].vid);
            }
            
            for (i=0;i < record.length; i++)
            {
                switch(record[i].type)
                {
                    case "vaccine":
                    myVaccines.push(record[i].vid);
                    break;
                    case "prescription":
                    myPrescriptions.push(record[i].vid);
                    break;
                    case "phr":
                    myPhrs.push(record[i].vid);
                    break;
                }            
            }
            var userModel = 
            {
                userId:localStorage.getItem("userId"),
                email:localStorage.getItem("loginUser"),
                password:localStorage.getItem("loginPassword"),
                myVaccines:myVaccines,
                myPrescriptions:myPrescriptions,
                myPhrs:myPhrs
            }
            
            $.ajax({
                url: "http://192.168.1.129:3000/User/"+localStorage.getItem("userId"),    // IP TO CHANGE
                type: "put",
                datatype : "json",
                async:false,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(userModel)
            });
            goBack();
            
            alert(getTranslatedText("Alerta_cambios_ok"));
            // This line will disable the cloud button if it is enabled
            document.getElementById("cloud-button").setAttribute("class", "km-widget km-button km-state-disabled");            
        }
    }
    else
    {
        alert(getTranslatedText("Alerta_no_conexion"));
    }
}

function onOnline()
{
    //alert("it's online");
    isOnline=true;
    if(requests.length > 0){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
}

function onOffline()
{
    //alert("it's offline");
    isOnline=false;
    document.getElementById("cloud-button").setAttribute("class", "km-widget km-button km-state-disabled");
}

function goBack()
{
    window.history.go(-1);
}
