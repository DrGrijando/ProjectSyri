function addNewPHR()
{
    currentElementList = "record-list";
    var title = document.getElementById("new-phr-title").value;
    var date = new Date(document.getElementById("new-phr-date").value);
    var text = document.getElementById("new-phr-text").value;
    if (title == "" || date == "" || text == "") {
        if(title == ""){ highlightInputError("new-phr-title"); }
        if(isNaN(date.getTime())){ highlightInputError("new-phr-date"); }
        if(text == ""){ highlightInputError("new-phr-text"); }
        alert(getTranslatedText("Alerta_introducir_info"));
    } else {
        var newItem = document.createElement("div");
        var vid = title.substring(0, 3).concat(date.toISOString().split("T")[0]).replace(/-| /g, '');
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
        info.innerHTML = date.toISOString().split("T")[0];
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
            url : "http://192.168.1.129:3000/Phr",    // IP TO CHANGE
            reqType : "post",
            entry : phrToStore
        };        
        requests.push(req);
        saveToLocalStorage(requests,"requests");
        // This line will enable the cloud button if it is disabled
        if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
        goBack();
        
        // Reset the inputs
        document.getElementById("new-phr-title").value = "";
        document.getElementById("new-phr-date").value = d.toISOString().split("T")[0];
        document.getElementById("new-phr-text").value = "";
    }    
}

function viewDetailedPHR()
{
    currentElementList = window.event.srcElement.parentElement.parentElement.id;
    
    for (var k = 0;k < record.length;k++) {
        //var p=JSON.parse(record[k]);
        if (record[k].vid == window.event.srcElement.parentElement.id) {
            d = new Date(record[k].date);
            document.getElementById("detailed-phr-title").value = record[k].title;
            document.getElementById("detailed-phr-date").value = d.toISOString().split("T")[0];
            document.getElementById("detailed-phr-text").value = record[k].text;
            currentElementID = record[k].vid;
            break;
        }
    } 
    document.location.href = "#detailed-phr-view";
}

function viewDetailedRecordVaccine()
{
    currentElementList = window.event.srcElement.parentElement.parentElement.id;
    for (var i = 0;i < record.length;i++) {
        //var v=JSON.parse(vaccines[i]);
        if (record[i].vid == window.event.srcElement.parentElement.id) {
            d = new Date(record[i].date);
            document.getElementById("detailed-record-vaccine-title").value = record[i].title;
            document.getElementById("detailed-record-vaccine-date").value = d.toISOString().split("T")[0];
            document.getElementById("detailed-record-vaccine-time").value = record[i].time;
            currentElementID = record[i].vid;
            break;
        }
    }     
    document.location.href = "#detailed-record-vaccine-view";    
}

function viewDetailedRecordPrescription()
{
    currentElementList = window.event.srcElement.parentElement.parentElement.id;    
    for (var j = 0;j < record.length;j++) {
        //var p=JSON.parse(prescriptions[j]);
        if (record[j].vid == window.event.srcElement.parentElement.id) {
            d = new Date(record[j].date);            
            document.getElementById("detailed-record-prescription-title").value = record[j].title;
            document.getElementById("detailed-record-prescription-date").value = d.toISOString().split("T")[0];
            d = new Date(record[j].finalDate);
            document.getElementById("detailed-record-prescription-final-date").value = d.toISOString().split("T")[0];
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

function updateRecordList()
{
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
                d=new Date(record[k].date);
                info.innerHTML = d.toISOString().split("T")[0]+" "+ record[k].time;
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
                d = new Date(record[k].date);
                info.innerHTML = d.toISOString().split("T")[0];
                info.className = 'prescription-date';
                newItem.appendChild(info);  // Add the TextNode to the ListItem
                if(record[k].text != "")
                {    
                    info = document.createElement("div");
                    info.innerHTML = record[k].text;
                    info.className = 'prescription-text';
                    newItem.appendChild(info);  // Add the TextNode to the ListItem
                }
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
                d = new Date(record[k].date)
                info.innerHTML = d.toISOString().split("T")[0];
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
                    vaccines[i].inRecord = "true";
                    
                    var req = {
                        url : "http://192.168.1.129:3000/Vaccine/"+currentElementID,    // IP TO CHANGE
                        reqType : "put",
                        entry : vaccines[i]
                    };
                    requests.push(req);
                    saveToLocalStorage(requests,"requests");
                    // This line will enable the cloud button if it is disabled
                    if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
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
                    prescriptions[i].inRecord = "true";
                    
                    var req = {
                        url : "http://192.168.1.129:3000/Prescription/"+currentElementID,    // IP TO CHANGE
                        reqType : "put",
                        entry : prescriptions[i]
                    };
                    requests.push(req);
                    saveToLocalStorage(requests,"requests");
                    // This line will enable the cloud button if it is disabled
                    if(isOnline){document.getElementById("cloud-button").setAttribute("class", "km-widget km-button");}
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

