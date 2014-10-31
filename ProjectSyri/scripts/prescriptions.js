function addNewPrescription()
{
    currentElementList = "prescription-list";
    var title = document.getElementById("new-prescription-title").value;
    var date = document.getElementById("new-prescription-date").value;
    var finalDate = document.getElementById("new-prescription-final-date").value;
    var doseTakes = document.getElementById("new-prescription-dose-takes").value;
    var doseTakesMeasure = document.getElementById("new-prescription-dose-takes-measure").value;
    var doseFrequency = document.getElementById("new-prescription-dose-frequency").value;
    var doseFrequencyMeasure = document.getElementById("new-prescription-dose-frequency-measure").value;
    var text = document.getElementById("new-prescription-text").value;
    
    if (title == "" || date == "" || finalDate == "" || doseTakes == "" || doseFrequency == "") {        
        if(title==""){ highlightInputError("new-prescription-title"); }
        if(date==""){ highlightInputError("new-prescription-date"); }        
        if(finalDate==""){ highlightInputError("new-prescription-final-date"); }
        if(doseTakes==""){ highlightInputError("new-prescription-dose-takes"); }
        if(doseFrequency==""){ highlightInputError("new-prescription-dose-frequency"); }
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
        
        if(text != "")
        {
            info = document.createElement("div");
            info.innerHTML = text;
            info.className = 'prescription-text';
            newItem.appendChild(info);	// Add the TextNode to the ListItem   
        }
        
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
        document.getElementById("cloud-button-number").innerHTML = requests.length;
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

function viewDetailedPrescription()
{
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

function updatePrescriptionList()
{
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
        
        if(prescriptions[j].text != "")
        {
            info = document.createElement("div");
            info.innerHTML = prescriptions[j].text;
            info.className = 'prescription-text';
            newItem.appendChild(info);  // Add the TextNode to the ListItem
        }
        
        newItem.onclick = viewDetailedPrescription;
        
        document.getElementById("prescription-list").appendChild(newItem);  // Add the div to the specified List
    }
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